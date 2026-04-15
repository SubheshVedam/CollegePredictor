import { google } from "googleapis";

/** Default spreadsheet from admissions VSAT intake calendar */
const DEFAULT_SPREADSHEET_ID =
  process.env.VSAT_SHEET_ID ||
  "1r3kyPMVBJ_T2Pk7gjOSMKXzmAkmONvgCx1eD4buP_k4";

const DEFAULT_RANGE = process.env.VSAT_SHEET_RANGE || "Sheet1!A:Z";

const VST_HEADER_ALIASES = new Set(["vst_date", "vst date"]);
const CLOSING_HEADER_ALIASES = new Set([
  "vst_application_closing_date",
  "vst application closing date",
]);

function normalizeHeader(cell) {
  return String(cell ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/_/g, " ");
}

function slugHeader(cell) {
  return String(cell ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");
}

const MS_PER_DAY = 86400000;
const SHEETS_EPOCH_UTC = Date.UTC(1899, 11, 30);
const IST_TIMEZONE = "Asia/Kolkata";
const IST_OFFSET_HOURS = 5;
const IST_OFFSET_MINUTES = 30;

function getDatePartsInTimeZone(date, timeZone = IST_TIMEZONE) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  return {
    year: Number(parts.find((p) => p.type === "year")?.value),
    month: Number(parts.find((p) => p.type === "month")?.value),
    day: Number(parts.find((p) => p.type === "day")?.value),
  };
}

function toIstDayKey(date) {
  if (!date || Number.isNaN(date.getTime())) return null;
  const { year, month, day } = getDatePartsInTimeZone(date);
  return year * 10000 + month * 100 + day;
}

function parseCellToDate(value) {
  if (value == null || value === "") return null;
  if (typeof value === "number" && Number.isFinite(value)) {
    return new Date(SHEETS_EPOCH_UTC + value * MS_PER_DAY);
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    const utcLike = trimmed.match(
      /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})[ T](\d{1,2}):(\d{2})(?::(\d{2}))?$/,
    );
    if (utcLike) {
      const [, year, month, day, hour, minute, second = "0"] = utcLike;
      const d = new Date(
        Date.UTC(
          Number(year),
          Number(month) - 1,
          Number(day),
          Number(hour),
          Number(minute),
          Number(second),
        ),
      );
      if (!Number.isNaN(d.getTime())) return d;
    }
    const t = Date.parse(trimmed);
    if (!Number.isNaN(t)) return new Date(t);
    const m = trimmed.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
    if (m) {
      const d = new Date(
        Date.UTC(Number(m[3]), Number(m[2]) - 1, Number(m[1])),
      );
      if (!Number.isNaN(d.getTime())) return d;
    }
  }
  return null;
}

function formatIntakeDisplay(value) {
  if (value == null || value === "") return "";
  const d = parseCellToDate(value);
  if (d && !Number.isNaN(d.getTime())) {
    return d.toLocaleDateString("en-GB", {
      timeZone: IST_TIMEZONE,
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return String(value).trim();
}

function startOfTodayIstDayKey() {
  return toIstDayKey(new Date());
}

/** End of IST calendar day for countdown (23:59:59.999 IST). */
function applicationClosingDeadlineMs(closingParsed) {
  if (!closingParsed || Number.isNaN(closingParsed.getTime())) return null;
  const { year, month, day } = getDatePartsInTimeZone(closingParsed);
  return Date.UTC(
    year,
    month - 1,
    day,
    23 - IST_OFFSET_HOURS,
    59 - IST_OFFSET_MINUTES,
    59,
    999,
  );
}

function resolveColumnIndices(headerRow) {
  let vstIdx = -1;
  let closingIdx = -1;
  headerRow.forEach((cell, i) => {
    const norm = normalizeHeader(cell);
    const slug = slugHeader(cell);
    if (VST_HEADER_ALIASES.has(norm) || slug === "vst_date") vstIdx = i;
    if (
      CLOSING_HEADER_ALIASES.has(norm) ||
      slug === "vst_application_closing_date"
    )
      closingIdx = i;
  });
  return { vstIdx, closingIdx };
}

function pickIntakeRow(rows, vstIdx) {
  const dataRows = rows
    .slice(1)
    .map((r, i) => ({ row: r, lineIndex: i + 2 }))
    .filter((entry) => entry.row.some((c) => c !== "" && c != null));

  if (dataRows.length === 0) return null;

  const withParsed = dataRows
    .map((entry) => {
      const raw = entry.row[vstIdx];
      const parsed = parseCellToDate(raw);
      return { ...entry, vstParsed: parsed, vstRaw: raw };
    })
    .filter((e) => e.vstRaw !== "" && e.vstRaw != null);

  if (withParsed.length === 0) return null;

  const todayIstDayKey = startOfTodayIstDayKey();
  const future = withParsed.filter(
    (e) => e.vstParsed && toIstDayKey(e.vstParsed) >= todayIstDayKey,
  );
  const pool = future.length > 0 ? future : withParsed;

  pool.sort((a, b) => {
    const ta = a.vstParsed?.getTime() ?? Infinity;
    const tb = b.vstParsed?.getTime() ?? Infinity;
    if (ta !== tb) return ta - tb;
    return a.lineIndex - b.lineIndex;
  });

  return pool[0];
}

/**
 * Reads VSAT exam date and application closing date from the configured Google Sheet.
 * Share the sheet with the service account email from GOOGLE_CLIENT_EMAIL.
 *
 * @returns {Promise<{ vstDateDisplay: string, applicationClosingDisplay: string, applicationClosingEndMs: number | null } | null>}
 */
export async function getVsatIntakeFromSheet() {
  const email = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !privateKey) {
    return null;
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: email,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: DEFAULT_SPREADSHEET_ID,
      range: DEFAULT_RANGE,
      valueRenderOption: "UNFORMATTED_VALUE",
    });

    const rows = res.data.values;
    if (!rows?.length) return null;

    const { vstIdx, closingIdx } = resolveColumnIndices(rows[0]);
    if (vstIdx < 0 || closingIdx < 0) return null;

    const picked = pickIntakeRow(rows, vstIdx);
    if (!picked) return null;

    const vstDisp = formatIntakeDisplay(picked.row[vstIdx]);
    const closingDisp = formatIntakeDisplay(picked.row[closingIdx]);

    if (!vstDisp || !closingDisp) return null;

    const closingParsed = parseCellToDate(picked.row[closingIdx]);
    const applicationClosingEndMs =
      applicationClosingDeadlineMs(closingParsed);

    return {
      vstDateDisplay: vstDisp,
      applicationClosingDisplay: closingDisp,
      applicationClosingEndMs,
    };
  } catch {
    return null;
  }
}

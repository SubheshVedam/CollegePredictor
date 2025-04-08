// /app/api/program-details/route.ts
import { db } from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const instituteId = searchParams.get("institute_id");
    const programName = searchParams.get("program_name");
    const gender = searchParams.get("gender");
    const category = searchParams.get("category");
    const sub_category = searchParams.get("sub_category");

    if (!instituteId || !programName) {
      return new Response(JSON.stringify({ error: "Missing parameters" }), {
        status: 400,
      });
    }

    const [rows] = await db.query(
      `
      SELECT 
        round,
        opening_rank,
        closing_rank,
        category,
        gender,
        sub_category
      FROM institute_cutoffs
      WHERE institute_id = ?
        AND program_name = ?
        AND gender = ?
        AND category = ?
        AND sub_category = ?
        ORDER BY round ASC
      `,
      [instituteId, programName, gender, category,sub_category]
    );

    return new Response(JSON.stringify(rows), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Program Details API ERROR:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

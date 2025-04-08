import { db } from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const rank = parseInt(searchParams.get("rank"));
    const gender = searchParams.get("gender");
    const category = searchParams.get("category");
    const stateId = 66; // Hardcoded as a number

    if (isNaN(rank) || !gender || !category) {
      return new Response(JSON.stringify({ error: "Missing or invalid input" }), {
        status: 400,
      });
    }

    const [rows] = await db.query(
      `
      SELECT 
        ic.closing_rank,
        ic.program_name,
        ic.category,
        ic.gender,
        ic.institute_id,
        ic.sub_category,
        ic.round,
        i.display_name AS institute_name
      FROM institute_cutoffs ic
      JOIN institutes i ON ic.institute_id = i.id
      WHERE ic.closing_rank >= ?
        AND ic.gender = ?
        AND ic.category = ?
        AND ic.round = 5
        AND (
          (i.state_id = ? AND ic.sub_category = 'HS') OR
          (i.state_id != ? AND ic.sub_category = 'OS')
        )
      ORDER BY ic.closing_rank ASC
      `,
      [rank, gender, category, stateId, stateId]
    );

    return new Response(JSON.stringify(rows), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("❌ API ERROR:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

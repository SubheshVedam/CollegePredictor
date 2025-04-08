import { db } from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const rank = parseInt(searchParams.get("rank"));
    const gender = searchParams.get("gender");
    const category = searchParams.get("category");
    const stateId = parseInt(searchParams.get("state_id"));

    if (isNaN(rank) || isNaN(stateId) || !gender || !category) {
      return new Response(
        JSON.stringify({ error: "Missing or invalid input" }),
        { status: 400 }
      );
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
      ORDER BY 
        (
          SELECT MIN(ic2.closing_rank)
          FROM institute_cutoffs ic2
          WHERE ic2.institute_id = ic.institute_id
            AND ic2.gender = ic.gender
            AND ic2.category = ic.category
            AND ic2.round = 5
            AND (
              (ic2.sub_category = 'HS' AND i.state_id = ?) OR
              (ic2.sub_category = 'OS' AND i.state_id != ?)
            )
        ) ASC,
        ic.closing_rank ASC;
      `,
      [rank, gender, category, stateId, stateId, stateId, stateId]
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

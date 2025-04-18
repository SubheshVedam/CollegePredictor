import { supabase } from '../../../lib/db';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const rank = parseInt(searchParams.get("rank"));
    const gender = searchParams.get("gender");
    const category = searchParams.get("category");
    const stateId = parseInt(searchParams.get("stateId"));

    if (isNaN(rank) || isNaN(stateId) || !gender || !category) {
      return new Response(
        JSON.stringify({ error: "Missing or invalid input" }),
        { status: 400 }
      );
    }

    // Fetch all matching rows from `institute_cutoffs` joined with `institutes`
    const { data: cutoffs, error } = await supabase
      .from('institute_cutoffs')
      .select(`
        opening_rank,
        closing_rank,
        program_name,
        category,
        gender,
        institute_id,
        sub_category,
        round,
        institutes (
          display_name,
          state_id
        )
      `)
      .gte('closing_rank', rank)
      .eq('gender', gender)
      .eq('category', category)
      .eq('round', 5);

    if (error) throw error;

    // Filter and sort the results manually (since Supabase SQL JOINs have limits)
    const filtered = cutoffs.filter(ic => {
      const instituteState = ic.institutes?.state_id;
      const isHS = instituteState === stateId && ic.sub_category === 'HS';
      const isOS = instituteState !== stateId && ic.sub_category === 'OS';
      return isHS || isOS;
    });

    // Sort by min rank per institute
    filtered.sort((a, b) => {
      const aRank = a.closing_rank;
      const bRank = b.closing_rank;
      return aRank - bRank;
    });

    // Format with `institute_name` field
    const result = filtered.map(ic => ({
      opening_rank: ic.opening_rank,
      closing_rank: ic.closing_rank,
      program_name: ic.program_name,
      category: ic.category,
      gender: ic.gender,
      institute_id: ic.institute_id,
      sub_category: ic.sub_category,
      round: ic.round,
      institute_name: ic.institutes?.display_name || 'Unknown',
    }));

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("❌ Supabase API ERROR:", error.message || error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

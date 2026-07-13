import { supabaseAdmin } from '../../../lib/db';
import { verifyOtpSession } from "../../../lib/auth/otp";
import {
  ALLOWED_GENDERS,
  ALLOWED_CATEGORIES,
} from "../../../lib/validation";


export async function GET(req) {
  const session = await verifyOtpSession();

  if (!session) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const rank = parseInt(searchParams.get("rank"));
    const gender = searchParams.get("gender");
    const category = searchParams.get("category");
    const stateId = parseInt(searchParams.get("stateId"));


    if (!ALLOWED_GENDERS.includes(gender)) {
      return new Response(
        JSON.stringify({ error: "Invalid gender" }),
        { status: 400 }
      );
    }

    if (!ALLOWED_CATEGORIES.includes(category)) {
      return new Response(
        JSON.stringify({ error: "Invalid category" }),
        { status: 400 }
      );
    }

    if (isNaN(rank) || isNaN(stateId) || !gender || !category) {
      return new Response(
        JSON.stringify({ error: "Missing or invalid input" }),
        { status: 400 }
      );
    }

    // Fetch all matching rows from `institute_cutoffs` joined with `institutes`
    const { data: cutoffs, error } = await supabaseAdmin
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

    const rows = cutoffs ?? [];

    // Filter and sort the results manually (since Supabase SQL JOINs have limits)
    const filtered = rows.filter(ic => {
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

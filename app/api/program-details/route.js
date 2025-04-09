import { supabase } from '../../../lib/db';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const instituteId = searchParams.get("institute_id");
    const programName = searchParams.get("program_name");
    const gender = searchParams.get("gender");
    const category = searchParams.get("category");
    const sub_category = searchParams.get("sub_category");

    if (!instituteId || !programName || !gender || !category || !sub_category) {
      return new Response(JSON.stringify({ error: "Missing parameters" }), {
        status: 400,
      });
    }

    const { data, error } = await supabase
      .from("institute_cutoffs")
      .select(`
        round,
        opening_rank,
        closing_rank,
        category,
        gender,
        sub_category
      `)
      .eq("institute_id", instituteId)
      .eq("program_name", programName)
      .eq("gender", gender)
      .eq("category", category)
      .eq("sub_category", sub_category)
      .order("round", { ascending: true });

    if (error) throw error;

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Program Details Supabase API ERROR:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

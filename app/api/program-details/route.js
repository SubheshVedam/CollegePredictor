import { supabaseAdmin } from '../../../lib/db';
import { verifyOtpSession } from "../../../lib/auth/otp";


export async function GET(req) {

  const session = await verifyOtpSession();

  if (!session) {
    return new Response(
      JSON.stringify({
        error: "Unauthorized"
      }),
      {
        status: 401
      }
    );
  }

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

    if (Number.isInteger(instituteId) || instituteId <= 0) {
      return new Response(
        JSON.stringify({ error: "Invalid institute id" }),
        { status: 400 }
      );
    }

    if (
      typeof programName !== "string" ||
      programName.trim().length === 0 ||
      programName.length > 150
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid program name" }),
        { status: 400 }
      );
    }

    const sanitizedProgramName = programName.trim();

    const { data, error } = await supabaseAdmin
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
      .eq("program_name", sanitizedProgramName)
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

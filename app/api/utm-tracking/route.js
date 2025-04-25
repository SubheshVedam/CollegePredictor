import { supabase } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { utmParam, isVerified,phone } = await req.json();

  try {
    const { error: insertError } = await supabase
      .from("utm")
      .insert([{ utm_param: utmParam, isVerified, phone }]);

    if (insertError) throw insertError;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in utm-tracking endpoint:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process request" },
      { status: 500 }
    );
  }
}

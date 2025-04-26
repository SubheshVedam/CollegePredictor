import { supabase } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { phone, name, email, year } = await req.json();

  try {
    // First check if phone number already exists
    const { data: existingUser, error: lookupError } = await supabase
      .from("verified_users")
      .select("phone_number")
      .eq("phone_number", phone)
      .single();

    if (lookupError && lookupError.code !== "PGRST116") {
      // PGRST116 is the code for "no rows found"
      throw lookupError;
    }

    // If user doesn't exist, insert them
    if (!existingUser) {
      const { error: insertError } = await supabase
        .from("verified_users")
        .insert([
          { phone_number: phone, name, email, twelfth_passing_year: year },
        ]);

      if (insertError) throw insertError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in save-user endpoint:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process request" },
      { status: 500 }
    );
  }
}

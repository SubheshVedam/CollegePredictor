import { supabase } from "../../../lib/db";
import { NextResponse } from "next/server";

// Sanitize string input
const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, 255);
};

// Validate phone number (10 digits)
const isValidPhone = (phone) => /^\d{10}$/.test(phone);

// Validate email
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const phone = sanitizeString(body.phone);
  const name = sanitizeString(body.name);
  const email = sanitizeString(body.email);
  const year = sanitizeString(body.year);
  const stream = sanitizeString(body.stream);

  // Validate required fields
  if (!phone || !isValidPhone(phone)) {
    return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }

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
          { phone_number: phone, name, email, twelfth_passing_year: year, stream },
        ]);

      if (insertError) throw insertError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in save-user endpoint:", error?.message);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

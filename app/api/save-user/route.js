import { supabase } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { phone, name, email } = await req.json();

  const { error } = await supabase.from('verified_users').insert([{ phone_number: phone, name, email }]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}

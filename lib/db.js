import mysql from "mysql2/promise";
import { createClient } from "@supabase/supabase-js";

export const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

// export const supabase = createClient(
//   supabaseUrl,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
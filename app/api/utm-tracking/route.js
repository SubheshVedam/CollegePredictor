import { supabase } from "../../../lib/db";
import { NextResponse } from "next/server";

// Validate phone number (10 digits)
const isValidPhone = (phone) => /^\d{10}$/.test(phone);

export async function POST(req) {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { utmParam, isVerified, phone } = body;

    // Validate phone
    if (!phone || !isValidPhone(phone)) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }
  
    try {
      // Always insert a new entry to attribute multiple campaigns per phone
      const { error: insertError } = await supabase
        .from("utm")
        .insert([{ utm_param: utmParam, isVerified, phone }]);
  
      if (insertError) throw insertError;
  
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Error in utm-tracking endpoint:", error?.message);
      return NextResponse.json(
        { error: "Failed to process request" },
        { status: 500 }
      );
    }
  }
  
export async function GET(req) {
    try {
      const { data, error } = await supabase
        .from("utm")
        .select("utm_param, created_at")
        .order("created_at", { ascending: false });
  
      if (error) throw error;
  
      const groupedData = {
        byCampaign: {},
        byMedium: {}
      };
  
      data.forEach(item => {
        const campaignMatch = item.utm_param.match(/utm_campaign=([^;]+)/);
        const mediumMatch = item.utm_param.match(/utm_medium=([^;]+)/);
        
        const campaign = campaignMatch ? campaignMatch[1] : 'unknown';
        const medium = mediumMatch ? mediumMatch[1] : 'unknown';
  
        // Count by Campaign
        if (!groupedData.byCampaign[campaign]) {
          groupedData.byCampaign[campaign] = 0;
        }
        groupedData.byCampaign[campaign]++;
  
        // Count by Medium
        if (!groupedData.byMedium[medium]) {
          groupedData.byMedium[medium] = 0;
        }
        groupedData.byMedium[medium]++;
      });
  
      return NextResponse.json({ 
        success: true,
        data: groupedData
      });
      
    } catch (error) {
      console.error("Error fetching UTM data:", error?.message);
      return NextResponse.json(
        { error: "Failed to fetch UTM data" },
        { status: 500 }
      );
    }
  }

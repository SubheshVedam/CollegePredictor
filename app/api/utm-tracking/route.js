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
      console.error("Error fetching UTM data:", error);
      return NextResponse.json(
        { error: error.message || "Failed to fetch UTM data" },
        { status: 500 }
      );
    }
  }

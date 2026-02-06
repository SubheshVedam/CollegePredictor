import fs from 'fs';
import path from 'path';

// Load marks to rank data
let marksToRankData = null;

function loadMarksToRankData() {
  if (marksToRankData) {
    return marksToRankData;
  }

  try {
    const filePath = path.join(process.cwd(), 'marksToRank.json');
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    marksToRankData = JSON.parse(fileContents);
    return marksToRankData;
  } catch (error) {
    console.error('Error loading marksToRank.json:', error);
    return null;
  }
}

function convertMarksToRank(marks) {
  const data = loadMarksToRankData();
  
  if (!data) {
    throw new Error('Marks to rank data not available');
  }

  // Round marks to nearest integer
  let marksKey = Math.round(marks);
  
  // For marks 0-50, use data for mark 50
  if (marksKey < 50) {
    marksKey = 50;
  }
  
  // For marks above 300, use data for mark 300
  if (marksKey > 300) {
    marksKey = 300;
  }

  // Get the rank data for this marks value
  const rankData = data[marksKey.toString()];
  
  if (!rankData) {
    throw new Error(`No rank data found for marks: ${marksKey}`);
  }

  // Return min, max, and avg
  return {
    min: rankData.min,
    max: rankData.max,
    avg: Math.round(rankData.avg)
  };
}

export async function POST(req) {
  try {
    const { marks, year, category } = await req.json();

    if (!marks || isNaN(marks) || marks < 0 || marks > 300) {
      return new Response(
        JSON.stringify({ error: "Invalid marks. Marks should be between 0 and 300." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Convert marks to rank using JSON data
    const rankData = convertMarksToRank(parseFloat(marks));

    return new Response(
      JSON.stringify({ 
        rank: rankData.avg, // Use avg for college predictions
        minRank: rankData.min,
        maxRank: rankData.max,
        marks: parseFloat(marks) 
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ Marks to Rank Conversion ERROR:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const filters = await request.json();
  
  try {
    let sql = 'SELECT * FROM cutoff_data WHERE 1=1';
    const params = [];
    
    if (filters.institute_id) {
      sql += ' AND institute_id = ?';
      params.push(filters.institute_id);
    }
    
    if (filters.course_id) {
      sql += ' AND course_id = ?';
      params.push(filters.course_id);
    }
    
    if (filters.program_name) {
      sql += ' AND program_name LIKE ?';
      params.push(`%${filters.program_name}%`);
    }
    
    if (filters.year) {
      sql += ' AND year = ?';
      params.push(filters.year);
    }
    
    if (filters.category) {
      sql += ' AND category = ?';
      params.push(filters.category);
    }
    
    if (filters.sub_category) {
      sql += ' AND sub_category = ?';
      params.push(filters.sub_category);
    }
    
    if (filters.gender) {
      sql += ' AND gender = ?';
      params.push(filters.gender);
    }
    
    if (filters.round) {
      sql += ' AND round = ?';
      params.push(filters.round);
    }
    
    // Add sorting
    sql += ' ORDER BY closing_rank ASC';
    
    const result = await query(sql, params);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Database query failed' },
      { status: 500 }
    );
  }
}
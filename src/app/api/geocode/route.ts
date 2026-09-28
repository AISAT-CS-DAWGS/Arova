import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  
  // This remains safely on the server
  const apiKey = process.env.NEXT_OWM_API_KEY; 

  if (!apiKey) {
    return NextResponse.json({ error: "Server missing API key configuration" }, { status: 500 });
  }

  try {
    let targetUrl = '';
    
    // Handle Direct Geocoding (Text Search)
    if (q) {
      targetUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=1&appid=${apiKey}`;
    } 
    // Handle Reverse Geocoding (GPS locate)
    else if (lat && lon) {
      targetUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
    } 
    else {
      return NextResponse.json({ error: "Missing search parameters" }, { status: 400 });
    }

    const res = await fetch(targetUrl);
    const data = await res.json();
    return NextResponse.json(data);
    
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch from OpenWeatherMap" }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city') ?? 'Raleigh';
  const key = process.env.OPENWEATHER_KEY;

  if (!key) {
    return NextResponse.json({ error: 'Server missing OPENWEATHER_KEY' }, { status: 500 });
  }

  const upstream = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${key}&units=imperial`, {
    cache: 'no-store',
  });

  if (!upstream.ok) {
    return NextResponse.json({ error: 'Weather service error' }, { status: 502 });
  }

  const data = await upstream.json();
  return NextResponse.json({
    city: data.name ?? city,
    temp: data.main?.temp,
    conditions: data.weather?.[0]?.main,
  });
}

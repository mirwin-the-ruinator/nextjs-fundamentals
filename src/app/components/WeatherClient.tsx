'use client';
import { useState } from 'react';

type Weather = { city: string; temp: number; conditions: string } | { error: string };

export default function WeatherClient() {
  const [city, setCity] = useState('Raleigh');
  const [data, setData] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchWeather(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const json = await res.json();
      setData(json);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={{ border: '1px solid #e5e7eb', padding: 12, borderRadius: 8 }}>
      <strong>Weather (Client)</strong>
      <form onSubmit={fetchWeather} style={{ marginTop: 8, display: 'flex', gap: 8 }}>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          style={{ padding: '6px 8px', border: '1px solid #ddd', borderRadius: 6, flex: 1 }}
        />
        <button type="submit" style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #ddd' }}>
          {loading ? 'Loading...' : 'Fetch'}
        </button>
      </form>
      <div style={{ marginTop: 8 }}>
        {data
          ? 'error' in data
            ? 'Service unavailable'
            : `${data.city}: ${Math.round(data.temp)}°F (${data.conditions})`
          : 'Enter a city and click Fetch'}
      </div>
    </section>
  );
}

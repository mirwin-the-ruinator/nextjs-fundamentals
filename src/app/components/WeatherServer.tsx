import { getBaseUrl } from '@/lib/baseUrl';

export default async function WeatherServer({ city = 'Raleigh' }: { city?: string }) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/weather?city=${encodeURIComponent(city)}`, { cache: 'no-store' });
  const data = await res.json();

  return (
    <section style={{ border: '1px solid #e5e7eb', padding: 12, borderRadius: 8 }}>
      <strong>Weather (SSR)</strong>
      <div style={{ marginTop: 6 }}>{data.error ? 'Service unavailable' : `${data.city}: ${Math.round(data.temp)}°F (${data.conditions})`}</div>
    </section>
  );
}

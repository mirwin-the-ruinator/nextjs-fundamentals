import WeatherServer from '@components/WeatherServer';
import WeatherClient from '@components/WeatherClient';

export const dynamic = 'force-dynamic'; // ensure this page isn't statically cached

export default async function Home() {
  return (
    <main style={{ maxWidth: 820, margin: '0 auto' }}>
      <h1>Welcome</h1>
      <p>Next.js fundamentals: SSG blog + SSR widget.</p>
      <div className="mt-16">
        {/* Initial server-rendered city */}
        <WeatherServer city="Raleigh" />
      </div>
      <div className="mt-16">
        <WeatherClient />
      </div>
    </main>
  );
}

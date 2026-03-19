import { useEffect, useState } from "react";

const WMO_CODES = {
  0: { label: "Clear", icon: "☀️" },
  1: { label: "Mostly Clear", icon: "🌤️" },
  2: { label: "Partly Cloudy", icon: "⛅" },
  3: { label: "Overcast", icon: "☁️" },
  45: { label: "Foggy", icon: "🌫️" },
  48: { label: "Foggy", icon: "🌫️" },
  51: { label: "Drizzle", icon: "🌦️" },
  53: { label: "Drizzle", icon: "🌦️" },
  55: { label: "Drizzle", icon: "🌦️" },
  61: { label: "Rain", icon: "🌧️" },
  63: { label: "Rain", icon: "🌧️" },
  65: { label: "Heavy Rain", icon: "🌧️" },
  71: { label: "Snow", icon: "❄️" },
  73: { label: "Snow", icon: "❄️" },
  75: { label: "Heavy Snow", icon: "❄️" },
  80: { label: "Showers", icon: "🌦️" },
  81: { label: "Showers", icon: "🌦️" },
  82: { label: "Heavy Showers", icon: "⛈️" },
  95: { label: "Thunderstorm", icon: "⛈️" },
  99: { label: "Thunderstorm", icon: "⛈️" },
};

const DateTimeWeather = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);

  // tick every second
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // get location then weather
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      async ({ coords }) => {
        try {
          const { latitude: lat, longitude: lon } = coords;

          // reverse geocode via open-meteo's free geocoding isn't available,
          // use bigdatacloud free reverse geocode (no key needed)
          const geoRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
          );
          const geoData = await geoRes.json();
          setCity(
            geoData.city || geoData.locality || geoData.countryName || "",
          );

          // open-meteo — no API key neededd
          const wxRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
          );
          const wxData = await wxRes.json();
          setWeather(wxData.current_weather);
        } catch {
          // silently fail
        } finally {
          setLoading(false);
        }
      },
      () => setLoading(false), // user denied location
    );
  }, []);

  const pad = (n) => String(n).padStart(2, "0");
  const hours = pad(time.getHours());
  const minutes = pad(time.getMinutes());
  const seconds = pad(time.getSeconds());
  const dateStr = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const wmo = weather
    ? WMO_CODES[weather.weathercode] || { label: "Clear", icon: "🌡️" }
    : null;

  return (
    <div className="w-full bg-white/60 backdrop-blur border-b border-purple-100 px-4 py-1.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-gray-500 gap-4 flex-wrap">
        {/* Date + Time */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span>📅</span>
            <span className="font-medium text-gray-700">{dateStr}</span>
          </span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1 font-mono">
            <span>🕐</span>
            <span className="font-semibold text-purple-600 tabular-nums">
              {hours}:{minutes}
              <span className="text-purple-400">:{seconds}</span>
            </span>
          </span>
        </div>

        {/* Weather */}
        <div className="flex items-center gap-1.5">
          {loading ? (
            <span className="text-gray-400 italic">Fetching weather...</span>
          ) : weather ? (
            <>
              <span className="text-base">{wmo.icon}</span>
              <span className="font-semibold text-gray-700">
                {Math.round(weather.temperature)}°C
              </span>
              <span className="text-gray-400">{wmo.label}</span>
              {city && (
                <>
                  <span className="text-gray-300">·</span>
                  <span className="flex items-center gap-0.5">
                    <span>📍</span>
                    <span className="text-gray-600">{city}</span>
                  </span>
                </>
              )}
            </>
          ) : (
            <span className="text-gray-400 italic">Weather unavailable</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateTimeWeather;

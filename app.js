async function getWeather() {
 let city = document.getElementById("city").value.trim();

  if (!city) {
    document.getElementById("result").innerHTML = "Enter city name";
    return;
  }

  document.getElementById("result").innerHTML = "Loading...";

  let geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
  let geoData = await geo.json();

  if (!geoData.results || geoData.results.length === 0) {
  document.getElementById("result").innerHTML = "City not found. Try another name.";
  return;
}
  let name = geoData.results[0].name;
  let lat = geoData.results[0].latitude;
  let lon = geoData.results[0].longitude;

  let weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
  let data = await weather.json();

  let temp = data.current_weather.temperature;
  let wind = data.current_weather.windspeed;
  let code = data.current_weather.weathercode;

  function getCondition(code) {
    if (code === 0) return "Clear sky";
    if (code <= 3) return "Cloudy";
    if (code <= 48) return "Fog";
    if (code <= 67) return "Rain";
    if (code <= 77) return "Snow";
    return "Unknown";
  }

  let condition = getCondition(code);

  document.getElementById("result").innerHTML = `
    <h3>${name}</h3>
    <p>🌡 Temperature: ${temp}°C</p>
    <p>💨 Wind: ${wind} km/h</p>
    <p>🌥 Condition: ${condition}</p>
  `;
}


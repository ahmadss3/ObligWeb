const locations = [
    { name: "Tokyo", latitude: 35.6895, longitude: 139.6917 },
    { name: "New York", latitude: 40.7128, longitude: -74.0060 },
    { name: "London", latitude: 51.5074, longitude: -0.1278 },
    { name: "Paris", latitude: 48.8566, longitude: 2.3522 },
    { name: "Sydney", latitude: -33.8688, longitude: 151.2093 }
];

const weatherContainer = document.getElementById('weather-container');


async function fetchWeather(location) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`;
    const response = await fetch(url);
    return await response.json();
}


function displayWeather(location, weather) {
    const weatherCard = document.createElement('div');
    weatherCard.classList.add('weather-card');

    weatherCard.innerHTML = `
        <div class="city-name">${location.name}</div>
        <div class="weather-details">
            Time: ${weather.current_weather.time}<br>  
            Temperature: ${weather.current_weather.temperature}  ${weather.current_weather_units.temperature}<br>
            Wind speed: ${weather.current_weather.windspeed} ${weather.current_weather_units.windspeed}<br>
            Wind direction: ${weather.current_weather.winddirection}  ${weather.current_weather_units.winddirection}<br>
             
        </div>
    `;

    weatherContainer.appendChild(weatherCard);
}


async function loadWeatherData() {
    weatherContainer.innerHTML = ''
    for (const location of locations) {
        const weather = await fetchWeather(location);
        displayWeather(location, weather);
    }
}


loadWeatherData();


setInterval(loadWeatherData, 600000); // Refresh every 10 minutes

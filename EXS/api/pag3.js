async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = 'your_api_key'; // Substitua por sua chave de API do OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?q=São%20Paulo&appid=your_api_key&units=metric`;
    
    try {
        const response = await fetch(url);

        // Verificar se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`City not found: ${city}`);
        }

        const data = await response.json();
        document.getElementById('weatherInfo').textContent = `Temperature: ${data.main.temp}°C`;
    } catch (error) {
        document.getElementById('weatherInfo').textContent = `Error: ${error.message}`;
    }
}

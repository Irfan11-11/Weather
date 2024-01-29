document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');

    searchBtn.addEventListener('click', () => {
        const cityInput = document.getElementById('cityInput');
        const cityName = cityInput.value.trim();

        if (cityName === '') {
            alert('Please enter a city name');
            return;
        }

        fetchWeather(cityName)
            .then(data => {
                const country = data.sys.country;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                const pressure = data.main.pressure;
                const temp     = data.main.temp;
                const feels_like = data.main.feels_like;


                const weatherDetails = document.getElementById('weatherDetails');
                weatherDetails.innerHTML = `
                    <h2>Weather in ${cityName}</h2>
                    <ul>
                    <li>country: ${country}</li>
                        <li>Humidity: ${humidity}%</li>
                        <li>Wind Speed: ${windSpeed}kmph</li>
                        <li>Pressure: ${pressure} </li>
                    </ul>

                    <h1>Temp: ${temp}</h1>
                    <h2>Feels Like: ${feels_like}</h2>



                
                `;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                const weatherDetails = document.getElementById('weatherDetails');
                weatherDetails.innerHTML = '<p>Weather data not found. Please try again.</p>';
            });
    });

    function fetchWeather(cityName) {
        const apiKey = '8ac5c4d57ba6a4b3dfcf622700447b1e';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        return fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Weather data not found');
                }
                return response.json();
            });
    }
});

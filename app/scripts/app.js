import * as ELEMENTS from './elements';
import { Http } from './http';
import { API_KEY } from './API';
import { WeatherData, WEATHER_PROXY_HANDLER } from './weather-data';

const updateWeather = (weatherData) => {
  ELEMENTS.WEATHER_CITY.textContent = weatherData.cityName;
  ELEMENTS.WEATHER_DESCRIPTION.textContent = weatherData.description;
  ELEMENTS.WEATHER_TEMPERATURE.textContent = weatherData.temperature;
  ELEMENTS.LOADING_TEXT.style.display = 'none';
  ELEMENTS.WEATHER_BOX.style.display = 'block';
};

const searchWeather = () => {
  const CITY_NAME = ELEMENTS.SEARCHED_CITY.value.trim();
  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}`;

  if (!CITY_NAME) {
    console.log('Enter city name');
    ELEMENTS.LOADING_TEXT.textContent = 'How about enter some city name?';
    ELEMENTS.LOADING_TEXT.style.display = 'block';
    return;
  }

  ELEMENTS.WEATHER_BOX.style.display = 'none';
  ELEMENTS.LOADING_TEXT.textContent = 'Loading...';
  ELEMENTS.LOADING_TEXT.style.display = 'block';

  Http.fetchData(URL)
    .then((responseData) => {
      const WEATHER_DATA = new WeatherData(CITY_NAME, responseData.weather[0].description.toUpperCase());
      const WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
      WEATHER_PROXY.temperature = responseData.main.temp;
      updateWeather(WEATHER_PROXY);
    })
    .catch(() => {
      ELEMENTS.LOADING_TEXT.textContent = 'Nothing to show here...';
    });
};

ELEMENTS.SEARCH_BUTTON.addEventListener('click', searchWeather);

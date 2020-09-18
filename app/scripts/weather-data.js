export class WeatherData {
  constructor(cityName, description) {
    this.cityName = cityName;
    this.description = description;
    this.temperature = '';
  }
}

export const WEATHER_PROXY_HANDLER = {
  get: (target, property) => Reflect.get(target, property),
  set: (target, property, value) => {
    const newValue = `${(value - 273.15).toFixed()} °C`;
    return Reflect.set(target, property, newValue);
  }
};

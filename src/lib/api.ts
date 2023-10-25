import axios from 'axios';

const API_KEY_WEATHER:string = 'fa97b572566041c2b1c185604230410';

export const getCityWeather = async (city: string) => {
  const forecast = await axios.get(`
    http://api.weatherapi.com/v1/forecast.json?q=${city}&days=7&key=${API_KEY_WEATHER}
  `);
  // console.log('forecast.data.forecast', forecast.data.forecast)
  return {
    current: forecast.data.current,
    location: forecast.data.location,
    forecast: forecast.data.forecast
  };
}
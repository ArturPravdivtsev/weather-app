import axios from 'axios';

const API_KEY_WEATHER:string = 'fa97b572566041c2b1c185604230410';

export const getCityWeather = async (city: string) => {
  const forecast = await axios.get(`
    http://api.weatherapi.com/v1/forecast.json?q=${city}&days=7&key=${API_KEY_WEATHER}
  `);
  return {
    current: forecast.data.current,
    location: forecast.data.location,
    forecast: forecast.data.forecast
  };
}

// export const getCityWeatherHourly = async (lat: number, lon:number) => {
//   const response = await axios.get(
//     `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=current,minutley,alerts&units=metric&appid=${API_KEY}`
//   );
//   const data = response.data;
//   return data;
// }

// export const getCityWeatherWeekly = async (lat: number, lon:number) => {
//   console.log('lat, lon', lat, lon)
//   const response = await axios.get(
//     `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&units=metric&appid=${API_KEY}`
//   );
//   const data = response.data;
//   return data;
// }
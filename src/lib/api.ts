import axios from 'axios';

const API_KEY:string = 'e8342fbc27f0c7142a735e56dc61c04b';

export const getCityWeather = async (city: string) => {
const response = await axios.get(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );
  const data = response.data;
  return data;
}
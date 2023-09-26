interface Weather {
  description: string,
  icon: string,
  main: string
}

export interface CurrentWeather {
  weather: [Weather],
  main: {
    feels_like: number,
    humidity: number,
    pressure: number,
    temp: number,
    temp_max: number,
    temp_min: number
  },
  wind: {
    deg: number,
    speed: number
  },
  coord: {
    lat: number,
    lon: number
  }
}

export interface CityObject {
  city: string,
  currentWeather: CurrentWeather
}

export interface City {
  [id:string]: CityObject
}
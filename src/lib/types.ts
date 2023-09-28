interface Weather {
  description: string,
  icon: string,
  main: string
}

export interface CurrentWeather {
  name: string,
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

export const currentWeatherItem = {
  name: '',
  weather: [{
    description: '',
    icon: '',
    main: ''
  }],
  main: {
    feels_like: 0,
    humidity: 0,
    pressure: 0,
    temp: 0,
    temp_max: 0,
    temp_min: 0
  },
  wind: {
    deg: 0,
    speed: 0
  },
  coord: {
    lat: 0,
    lon: 0
  }
}
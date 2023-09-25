interface Weather {
  description: string,
  icon: string,
  main: string
}

export interface CityObject {
  city: string,
  currentWeather: {
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
    }
  }
}

export interface City {
  [id:string]: CityObject
}
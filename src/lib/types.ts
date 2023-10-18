// interface Weather {
//   description: string,
//   icon: string,
//   main: string
// }

// export interface CurrentWeather {
//   name: string,
//   weather: [Weather],
//   main: {
//     feels_like: number,
//     humidity: number,
//     pressure: number,
//     temp: number,
//     temp_max: number,
//     temp_min: number
//   },
//   wind: {
//     deg: number,
//     speed: number
//   },
//   coord: {
//     lat: number,
//     lon: number
//   }
// }

// export interface CityObject {
//   city: string,
//   currentWeather: CurrentWeather
// }

// export interface City {
//   [id:string]: CityObject
// }

// export const currentWeatherItem = {
//   name: '',
//   weather: [{
//     description: '',
//     icon: '',
//     main: ''
//   }],
//   main: {
//     feels_like: 0,
//     humidity: 0,
//     pressure: 0,
//     temp: 0,
//     temp_max: 0,
//     temp_min: 0
//   },
//   wind: {
//     deg: 0,
//     speed: 0
//   },
//   coord: {
//     lat: 0,
//     lon: 0
//   }
// }

// export interface Forecast {
//   dt: number,
//   weather: [Weather],
//   main: {
//     feels_like: number,
//     humidity: number,
//     pressure: number,
//     temp: number,
//     temp_max: number,
//     temp_min: number
//   }
// }

interface Condition {
  code: number,
  icon: string,
  text: string
}

export interface HourForecast {
  temp_c: number,
  temp_f: number,
  time: string,
  condition: Condition
}

export interface Forecastday {
  day: {
    avgtemp_c: number,
    maxtemp_c: number,
    mintemp_c: number,
    avgtemp_f: number,
    maxtemp_f: number,
    mintemp_f: number,
    condition: Condition,
    daily_chance_of_rain: number,
    maxwind_kph: number
  },
  date: string,
  date_epoch: number,
  hour: HourForecast[]
}

export interface City {
  id: string,
  location: {
    name: string,
    country: string,
    lat: number,
    lon: number
  },
  current: {
    feelslike_c: number,
    feelslike_f: number,
    is_day: number,
    temp_c: number,
    temp_f: number,
    wind_kph: number,
    condition: Condition,
    humidity: number
  },
  forecast: {
    forecastday: Forecastday[]
  }
}

export const CityItem = {
  id: '',
  location: {
    name: '',
    country: '',
    lat: 0,
    lon: 0
  },
  current: {
    feelslike_c: 0,
    feelslike_f: 0,
    is_day: 0,
    temp_c: 0,
    temp_f: 0,
    wind_kph: 0,
    condition: {
      code: 0,
      icon: '',
      text: ''
    },
    humidity: 0
  },
  forecast:{
    forecastday: [{
      day: {
        avgtemp_c: 0,
        maxtemp_c: 0,
        mintemp_c: 0,
        avgtemp_f: 0,
        maxtemp_f: 0,
        mintemp_f: 0,
        condition: {
          code: 0,
          icon: '',
          text: ''
        },
        daily_chance_of_rain: 0,
        maxwind_kph: 0
      },
      hour: [{
        temp_c: 0,
        temp_f: 0,
        time: '',
        condition: {
          code: 0,
          icon: '',
          text: ''
        }
      }]
    }]
  }
}
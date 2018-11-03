
export interface IWeather {
  coord: Cooridnate,
  sys: Sys,
  weather: WeatherDetail[],
  main: Main,
  wind: Wind,
  rain: Rain,
  clouds: Cloud,
  dt: number,
  id: number,
  name: string,
  cod: number
}

interface Cooridnate {
  lon: number,
  lat: number
}

interface Sys {
  country: string,
  sunrise: number,
  sunset: number
}

interface WeatherDetail {
  id: number,
  main: string,
  description: string,
  icon: string
}

interface Main {
  temp: number,
  humidity: number,
  pressure: number,
  temp_min: number,
  temp_max: number
}

interface Wind {
  speed: number,
  deg: number
}

interface Rain {
  '3h': number
}

interface Cloud {
  all: number
}

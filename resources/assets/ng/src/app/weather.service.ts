import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class WeatherService {
  private APIKEY: string = '2580c0421b529216d4197f97870a52a6';

  constructor(private http: HttpClient) { }

  getWeatherByGeoLocale(long: number, lat: number): Promise<any> {
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon=' + long + '&APPID=' + this.APIKEY).toPromise();
  }

}

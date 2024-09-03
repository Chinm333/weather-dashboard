import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  weatherData: any = null;
  forecastData: any = null;
  backgroundImage: string | null = null;

  private readonly WEATHER_API_KEY =  environment.WEATHER_API_KEY;
  private readonly WEATHER_API_URL =  environment.WEATHER_API_URL;
  private readonly FORECAST_API_URL =  environment.FORECAST_API_URL;

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.getGeolocation();
  }

  private getGeolocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.fetchWeatherData(lat, lon);
        },
        (error) => {
          console.error('Error fetching geolocation:', error);
          this.toastr.error('Failed to fetch geolocation. Using default coordinates.');
          this.fetchWeatherData(26.1158, 91.7086);
        }
      );
    }
  }

  private fetchWeatherData(lat: number, lon: number, unit: string = 'metric'): void {
    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('units', unit)
      .set('appid', this.WEATHER_API_KEY);

    this.http.get(this.WEATHER_API_URL, { params }).subscribe(
      (data: any) => {
        this.weatherData = data;
        this.backgroundImage = this.getBackgroundImage(this.weatherData.weather[0].main);
        this.fetchForecastData(lat, lon, unit);
      },
      (error) => {
        console.error('Failed to fetch weather data:', error);
        this.toastr.error('Failed to fetch weather data.');
      }
    );
  }

  private fetchForecastData(lat: number, lon: number, unit: string): void {
    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('units', unit)
      .set('appid', this.WEATHER_API_KEY);

    this.http.get(this.FORECAST_API_URL, { params }).subscribe(
      (data: any) => {
        this.forecastData = data;
      },
      (error) => {
        console.error('Failed to fetch forecast data:', error);
        this.toastr.error('Failed to fetch weather data.');
      }
    );
  }

  private getBackgroundImage(weatherCondition: string): string {
    const weatherBackgrounds: { [key: string]: string } = {
      Clear: 'assets/images/clear.jpg',
      Clouds: 'assets/images/cloudy.jpg',
      Rain: 'assets/images/rainy.jpg',
      Snow: 'assets/images/snowy.jpg',
      Sunny: 'assets/images/sunny.jpg'
    };

    return weatherBackgrounds[weatherCondition] || 'assets/images/clear.jpg';
  }

  getCurrentDate(): string {
    const date = new Date();
    return date.toLocaleDateString();
  }
  searchByCity(event: any): void {
    const city = event;
    const params = new HttpParams()
      .set('q', city)
      .set('limit', '5')
      .set('appid', this.WEATHER_API_KEY);

    this.http.get(environment.CITY_LAT_LNG, { params }).subscribe(
      (data: any) => {
        if (data.length>0) {
          const lat = data[0].lat;
          const lon = data[0].lon;
          this.fetchWeatherData(lat, lon);
        } else {
          this.toastr.error('Please enter a valid city.');
        }
      },
      (error) => {
        console.error('Failed to search by city:', error);
        this.toastr.error('Please enter a valid city.');
      }
    );
  }

  getDailyForecast(forecastData: any): any[] {
    const dailyForecasts: any[] = [];
    const dateMap: { [key: string]: any[] } = {};

    forecastData.list.forEach((item: any) => {
      const date = new Date(item.dt_txt).toDateString();
      if (!dateMap[date]) {
        dateMap[date] = [];
      }
      dateMap[date].push(item);
    });

    Object.keys(dateMap).forEach((date) => {
      const dayData = dateMap[date];
      const temps = dayData.map(item => item.main.temp);
      const tempMin = Math.min(...temps);
      const tempMax = Math.max(...temps);
      const main = dayData[0].weather[0].main;
      const pop = Math.max(...dayData.map(item => item.pop));
      dailyForecasts.push({
        date,
        tempMin,
        tempMax,
        main,
        pop,
      });
    });

    return dailyForecasts;
  }
}

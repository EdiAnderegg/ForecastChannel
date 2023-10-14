import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Location } from '../interfaces/location.interface';


@Injectable({
  providedIn: 'root'
})
export class NearLocationService {

  private url : string = 'assets/Data/cities.json';


  constructor(private readonly http: HttpClient) { }


  public getNearestCities$(inputCity: string): Observable<Location[]> {
    return this.http.get<any>(this.url).pipe(map((res) => {
      const citiesData = res;
      // Find the city in the JSON data by name
      const selectedCity = citiesData.find(
        (city: { city_ascii: string; }) => city.city_ascii === inputCity
      );
      if (!selectedCity) {
        console.error("City not found");
        return [];
      }
      // Get the country of the selected city
      const selectedCountry = selectedCity.country;
      // Replace these with the coordinates of the selected city
      const cityLat = parseFloat(selectedCity.lat);
      const cityLng = parseFloat(selectedCity.lng);

      // Calculate distances and filter cities in the same country
      const nearestCities = citiesData
        .filter((city: { city_ascii: string; country: string; }) => city.country === selectedCountry && city.city_ascii !== inputCity) // Exclude the input city and filter by the same country
        .map((city: { country: string, city_ascii: string, lat: string, lng: string }) => ({
          country: city.country,
          city: city.city_ascii,
          lat: parseFloat(city.lat),
          lon: parseFloat(city.lng)
        }))
        .sort((a: { lat: number; lon: number; }, b: { lon: number; lat: number; }) => {
          return this.calculateDistance(cityLat, cityLng, a.lat, a.lon) - this.calculateDistance(cityLat, cityLng, b.lat, b.lon);
        })
        .slice(0, 20); // Get the 20 nearest cities within the same country

      return nearestCities;
    }));
  }


  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  }
}

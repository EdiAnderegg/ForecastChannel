import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Location } from '../interfaces/location.interface';

@Injectable({
  providedIn: 'root',
})
export class NearLocationService {
  private url: string = 'assets/Data/cities.json';

  constructor(private readonly http: HttpClient) {}

  public getNearestCities$(lat: number, lng: number): Observable<Location[]> {
    return this.http.get<any>(this.url).pipe(
      map((res) => {
        const citiesData = res;

        // Calculate distances and filter cities in the same country
        const nearestCities = citiesData
          .map(
            (city: {
              country: string;
              city_ascii: string;
              lat: string;
              lng: string;
            }) => ({
              country: city.country,
              city: city.city_ascii,
              lat: parseFloat(city.lat),
              lon: parseFloat(city.lng),
            })
          )
          .filter(
            (city: {
              country: string;
              city: string;
              lat: number;
              lon: number;
            }) => {
              // Exclude the input coordinates and filter by the same country
              return (
                city.lat !== lat &&
                city.lon !== lng &&
                this.calculateDistance(lat, lng, city.lat, city.lon) <= 100 //MAX_DISTANCE
              );
            }
          )
          .sort(
            (
              a: { lat: number; lon: number },
              b: { lon: number; lat: number }
            ) => {
              return (
                this.calculateDistance(lat, lng, a.lat, a.lon) -
                this.calculateDistance(lat, lng, b.lat, b.lon)
              );
            }
          )
          .slice(0, 20); // Get the 20 nearest cities within the same country

        return nearestCities;
      })
    );
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

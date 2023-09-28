import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NearLocationService {

  private url : string = 'assets/Data/cities.json';


  constructor(private readonly http: HttpClient) { }


  public getNearestCities$(inputCity: string):Observable<string[]> {

    return this.http.get<any>(this.url).pipe(map((res)=>{
      const citiesData = res;
      // Find the city in the JSON data by name
      const selectedCity = citiesData.find(
        (city: { city: string; }) => city.city === inputCity
        );
        if (!selectedCity) {
          console.error("City not found");
          return [];
        }
        // Replace these with the coordinates of the selected city
        const cityLat = parseFloat(selectedCity.lat);
        const cityLng = parseFloat(selectedCity.lng);

        // Calculate distances and sort the cities by distance
        const nearestCities = citiesData
        .filter((city: { city: string; }) => city.city !== inputCity) // Exclude the input city
        .map((city: { city: any; lat: string; lng: string; }) => ({
           name: city.city,
           distance: this.calculateDistance(
          cityLat,
          cityLng,
          parseFloat(city.lat),
          parseFloat(city.lng)
        )
      }))
      .sort((a: { distance: number; }, b: { distance: number; }) => a.distance - b.distance)
      .slice(0, 10); // Get the 10 nearest cities

    return nearestCities.map((city: { name: any; }) => city.name);
    }));
  }


  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    // Calculate distance between two coordinates (you can use the Haversine formula)
    // Implement the distance calculation logic here
    // This is a simplified example; you can find more accurate implementations online
    const R = 6371; // Earth's radius in km
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

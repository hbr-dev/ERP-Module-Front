import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Region } from '../models/region';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RegionService {

  private url = "Region";





  constructor(private http: HttpClient) { }



  public getRegions() : Observable<Region[]> {
    return this.http.get<Region[]>(`${environment.apiURL}/${this.url}`);
  }



  public createRegion(region: Region) : Observable<Region[]> {
    return this.http.post<Region[]>(
      `${environment.apiURL}/${this.url}`,
      region
    );
  }
}

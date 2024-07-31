import { Injectable } from '@angular/core';
import { SubRegion } from '../models/subRegion';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubregionService {

  private url = "SubRegion";





  constructor(private http: HttpClient) { }



  public getSubRegions() : Observable<SubRegion[]> {
    return this.http.get<SubRegion[]>(`${environment.apiURL}/${this.url}`);
  }



  public createRegion(subregion: SubRegion) : Observable<SubRegion[]> {
    return this.http.post<SubRegion[]>(
      `${environment.apiURL}/${this.url}`,
      subregion
    );
  }
}

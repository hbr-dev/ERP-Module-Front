import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mission } from '../models/mission';

@Injectable({
  providedIn: 'root'
})

export class MissionService {
  private url = "Mission";





  constructor(private http: HttpClient) { }



  public getMissions() : Observable<Mission[]> {
    return this.http.get<Mission[]>(`${environment.apiURL}/${this.url}`);
  }



  public updateMission(misison : Mission) : Observable<Mission[]> 
  {
    return this.http.put<Mission[]>(
      `${environment.apiURL}/${this.url}`, 
      misison
    );
  }



  public createMission(mission: Mission) : Observable<Mission[]> {
    return this.http.post<Mission[]>(
      `${environment.apiURL}/${this.url}`,
      mission
    );
  }
}

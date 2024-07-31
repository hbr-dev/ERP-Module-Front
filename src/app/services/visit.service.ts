import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Visit } from '../models/visit';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class VisitService {
  private url = "Visit";





  constructor(private http: HttpClient) { }



  public getVisits() : Observable<Visit[]> {
    return this.http.get<Visit[]>(`${environment.apiURL}/${this.url}`);
  }



  public updateVisit(visit : Visit) : Observable<Visit[]> 
  {
    return this.http.put<Visit[]>(
      `${environment.apiURL}/${this.url}`, 
      visit
    );
  }



  public createVisit(visit: Visit) : Observable<Visit[]> {
    return this.http.post<Visit[]>(
      `${environment.apiURL}/${this.url}`,
      visit
    );
  }



  public deleteVisit(visit : Visit) : Observable<Visit[]> 
  {
    return this.http.delete<Visit[]>(
      `${environment.apiURL}/${this.url}/${visit.id}`
    );
  }
}

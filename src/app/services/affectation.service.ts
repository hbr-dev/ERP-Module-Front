import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Affectation } from '../models/affectation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AffectationService {
  private url = "Affectation";





  constructor(private http: HttpClient) { }



  public getAffectations() : Observable<Affectation[]> {
    return this.http.get<Affectation[]>(`${environment.apiURL}/${this.url}`);
  }



  public updateAffectation(aff : Affectation) : Observable<Affectation[]> 
  {
    return this.http.put<Affectation[]>(
      `${environment.apiURL}/${this.url}`, 
      aff
    );
  }



  public createAffectation(aff: Affectation) : Observable<Affectation[]> {
    return this.http.post<Affectation[]>(
      `${environment.apiURL}/${this.url}`,
      aff
    );
  }



  public deleteAff(aff : Affectation) : Observable<Affectation[]> 
  {
    return this.http.delete<Affectation[]>(
      `${environment.apiURL}/${this.url}/${aff.id}`
    );
  }
}

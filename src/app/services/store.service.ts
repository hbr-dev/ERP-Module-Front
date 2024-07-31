import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Store } from '../models/store';

@Injectable({
  providedIn: 'root'
})

export class StoreService {
  private url = "Store";





  constructor(private http: HttpClient) { }



  public getStores() : Observable<Store[]> {
    return this.http.get<Store[]>(`${environment.apiURL}/${this.url}`);
  }



  public updateStore(store : Store) : Observable<Store[]> 
  {
    return this.http.put<Store[]>(
      `${environment.apiURL}/${this.url}`, 
      store
    );
  }



  public createStore(store: Store) : Observable<Store[]> {
    return this.http.post<Store[]>(
      `${environment.apiURL}/${this.url}`,
      store
    );
  }



}

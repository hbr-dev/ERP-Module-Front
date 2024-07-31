import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AreaManager } from '../models/area_manager';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AreaManagerService {
  private url = "AreaManager";





  constructor(private http: HttpClient) { }



  public getAreaManagers() : Observable<AreaManager[]> {
    return this.http.get<AreaManager[]>(`${environment.apiURL}/${this.url}`);
  }



  public updateAreaManager(area_manager : AreaManager) : Observable<AreaManager[]> 
  {
    return this.http.put<AreaManager[]>(
      `${environment.apiURL}/${this.url}`, 
      area_manager
    );
  }



  public createAreaManager(area_manager: AreaManager) : Observable<AreaManager[]> {
    return this.http.post<AreaManager[]>(
      `${environment.apiURL}/${this.url}`,
      area_manager
    );
  }



  public deleteAreaManager(areaManager : AreaManager) : Observable<AreaManager[]> 
  {
    return this.http.delete<AreaManager[]>(
      `${environment.apiURL}/${this.url}/${areaManager.id}`
    );
  }


}

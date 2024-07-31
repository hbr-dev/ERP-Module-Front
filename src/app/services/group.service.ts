import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../models/group';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GroupService {
  private url = "Group";





  constructor(private http: HttpClient) { }



  public getGroups() : Observable<Group[]> {
    return this.http.get<Group[]>(`${environment.apiURL}/${this.url}`);
  }



  public createGroup(group: Group) : Observable<Group[]> {
    return this.http.post<Group[]>(
      `${environment.apiURL}/${this.url}`,
      group
    );
  }
}

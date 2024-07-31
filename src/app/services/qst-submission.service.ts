import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QSTSubMission } from '../models/qst_submission';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class QstSubmissionService {

  private url = "QSTSubMission";






  constructor(private http: HttpClient) { }



  public getQSTsSubMissions() : Observable<QSTSubMission[]> {
    return this.http.get<QSTSubMission[]>(`${environment.apiURL}/${this.url}`);
  }



  public updateQSTSubMission(qstSubMiss : QSTSubMission) : Observable<QSTSubMission[]> 
  {
    return this.http.put<QSTSubMission[]>(
      `${environment.apiURL}/${this.url}`, 
      qstSubMiss
    );
  }



  public createQSTSubMission(qst_submiss: QSTSubMission) : Observable<QSTSubMission[]> {
    return this.http.post<QSTSubMission[]>(
      `${environment.apiURL}/${this.url}`,
      qst_submiss
    );
  }

}

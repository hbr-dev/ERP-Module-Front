import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Submission } from '../models/submission';

@Injectable({
  providedIn: 'root'
})

export class SubmissionService {

  private url = "SubMission";






  constructor(private http: HttpClient) { }



  public getSubmissions() : Observable<Submission[]> {
    return this.http.get<Submission[]>(`${environment.apiURL}/${this.url}`);
  }



  public updateSubMission(subMiss : Submission) : Observable<Submission[]> 
  {
    return this.http.put<Submission[]>(
      `${environment.apiURL}/${this.url}`, 
      subMiss
    );
  }



  public createSubmission(submission: Submission) : Observable<Submission[]> {
    return this.http.post<Submission[]>(
      `${environment.apiURL}/${this.url}`,
      submission
    );
  }
}

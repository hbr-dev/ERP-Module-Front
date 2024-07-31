import { Injectable } from '@angular/core';
import { Subject } from '../models/subject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SubjectService {

  private url = "Subject";






  constructor(private http: HttpClient) { }



  public getSubjects() : Observable<Subject[]> {
    return this.http.get<Subject[]>(`${environment.apiURL}/${this.url}`);
  }



  public createSubject(subject: Subject) : Observable<Subject[]> {
    return this.http.post<Subject[]>(
      `${environment.apiURL}/${this.url}`,
      subject
    );
  }
}

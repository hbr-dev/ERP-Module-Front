import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  private url = "Question";






  constructor(private http: HttpClient) { }



  public getQuestions() : Observable<Question[]> {
    return this.http.get<Question[]>(`${environment.apiURL}/${this.url}`);
  }



  public createQuestion(question: Question) : Observable<Question[]> {
    return this.http.post<Question[]>(
      `${environment.apiURL}/${this.url}`,
      question
    );
  }

}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QSTSubMission } from 'src/app/models/qst_submission';
import { Question } from 'src/app/models/question';
import { Submission } from 'src/app/models/submission';
import { QstSubmissionService } from 'src/app/services/qst-submission.service';
import { QuestionService } from 'src/app/services/question.service';
import { SubmissionService } from 'src/app/services/submission.service';

@Component({
  selector: 'app-submissions-dialog',
  templateUrl: './submissions-dialog.component.html',
  styleUrls: ['./submissions-dialog.component.css']
})

export class SubmissionsDialogComponent {

  availableSubmissions: Submission[] = [];
  availableQuestions: Question[] = [];
  availableQSTsSubMissions: QSTSubMission[] = [];
  filteredQSTsSubMiss: QSTSubMission[] = [];
  affectedSubMissions: Submission[] = [];

  displayQSTs: boolean = false;





  constructor(
    public dialogRef: MatDialogRef<SubmissionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public sentData: any,
    private questionService: QuestionService,
    private submissionService: SubmissionService,
    private qstsSubMissService: QstSubmissionService
  ) { }



  ngOnInit(): void {
    this.submissionService
        .getSubmissions()
        .subscribe({
          next: (data) => {
            this.availableSubmissions = data;
            this.affectedSubMissions = this.availableSubmissions.filter( (obj) => {
              return obj.mission_id === this.sentData.missionID;
            });
          },
          error: (error) => {
            console.log(error);
          }
        })
    ;
    // ------------
    this.questionService
        .getQuestions()
        .subscribe({
          next: (data) => {
            this.availableQuestions = data;
          },
          error: (error) => {
            console.log("error: " + error);
          }
        });
    // ------------
    this.qstsSubMissService
        .getQSTsSubMissions()
        .subscribe({
          next: (data) => {
            this.availableQSTsSubMissions = data;
          },
          error: (error) => {
            console.log(error);
          }
        })
  }



  getAffectedQsts(id: number): void {
    this.displayQSTs = true;
    this.filteredQSTsSubMiss = this.availableQSTsSubMissions.filter((obj)=>{
      return obj.submission_id === id;
    });
  }



  onCancel(): void {
    this.dialogRef.close();
  }

}

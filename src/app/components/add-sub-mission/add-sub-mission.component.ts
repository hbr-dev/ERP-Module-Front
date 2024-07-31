import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QSTSubMission } from 'src/app/models/qst_submission';
import { Question } from 'src/app/models/question';
import { Submission } from 'src/app/models/submission';
import { QstSubmissionService } from 'src/app/services/qst-submission.service';
import { QuestionService } from 'src/app/services/question.service';
import { SubmissionService } from 'src/app/services/submission.service';

@Component({
  selector: 'app-add-sub-mission',
  templateUrl: './add-sub-mission.component.html',
  styleUrls: ['./add-sub-mission.component.css']
})


export class AddSubMissionComponent {

  addNewQuestion=false;
  qstExist=false;
  subMissExist=false;
  qstAdded=false;
  subMissAdded=false;
  qstSubMissAdded=false;
  failedToAddQSTSubMiss=false;
  failedToAddSubM=false;
  failedToAddQST=false;
  formNotValid=false;
  inProgress=false;

  addedSubmissionID?: number;

  availableQuestions: Question[] = [];
  availableSubmissions: Submission[] = [];
  availableQSTsSubMissions: QSTSubMission[] = [];

  subMissionForm= new FormGroup({
    subMissionName: new FormControl("", [Validators.required]),
    subMissionQuestions: new FormControl("", [Validators.required]),
    // questionsId: new FormControl("", [Validators.required]),
  });

  questionForm= new FormGroup({
    question: new FormControl("", [Validators.required, Validators.maxLength(250)]),
  });





  constructor(
    public dialogRef: MatDialogRef<AddSubMissionComponent>,
    @Inject(MAT_DIALOG_DATA) public missionData: any,
    private questionService: QuestionService,
    private submissionService: SubmissionService,
    private qstSubmissionService: QstSubmissionService
  ){}



  ngOnInit(): void {
    this.questionService
        .getQuestions()
        .subscribe( (result : Question[]) => (this.availableQuestions = result) );
    // ---------
    this.submissionService
        .getSubmissions()
        .subscribe( (result: Submission[]) => (this.availableSubmissions = result) );
  }



  addQuestion(): void {
    if(this.questionForm.valid) {
      this.inProgress=true;
      let qst = new Question();
      // -----------
      if(this.questionForm.value.question) {
        const found = this.availableQuestions.find((obj) => {
          return obj.question === this.questionForm.value.question;
        })
        if(!found) {
          qst.question = this.questionForm.value.question;
          this.qstExist = false;
        } else {
          this.qstExist = true;
          this.inProgress = false;
          return;
        }
      }
      // -----------
      this.questionService.createQuestion(qst).subscribe({
        next: (data) => {
          this.availableQuestions = data;
          this.inProgress = false;
          this.qstAdded = true;
        },
        error: (error) => {
          this.failedToAddQST = true;
          this.inProgress = false;
          console.log(error);
        }
      });
      // -----------
    } else {
      console.log("All fields must be valid");
    }
  }



  addSubMission(relatedMissionId: number): void {
    const filtredSubMissions = this.availableSubmissions.filter( (obj) => {
      return obj.mission_id === relatedMissionId;
    });
    if(this.subMissionForm.valid){
      this.inProgress = true;
      const found = filtredSubMissions.find( (obj) => {
        return obj.name === this.subMissionForm.value.subMissionName;
      });
      if(found) {
        console.log("Name found !! " + found.name);
        this.subMissExist = true;
        this.inProgress = false;
        return;
      }
      let subMission = new Submission();
      // ------------
      if(this.subMissionForm.value.subMissionName)
        subMission.name = this.subMissionForm.value.subMissionName;
      else {
        this.inProgress = false;
        return;
      }
      subMission.mission_id = relatedMissionId;
      subMission.status = 2;
      this.submissionService.createSubmission(subMission).subscribe({
        next: (data) => {
          this.subMissAdded = true;
          this.addedSubmissionID = data[data.length - 1].id;
          this.availableSubmissions = data;
          this.addQSTSubMission();
        },
        error: (error) => {
          this.failedToAddSubM = true;
          console.log(error);
        }
      });
      // ------------
      this.inProgress = false;
    } else {
      this.formNotValid = true;
      console.log("All fields must be valid");
    }
  }



  private addQSTSubMission() {
    if(this.subMissionForm.value.subMissionQuestions) {
      for(let qst of this.subMissionForm.value.subMissionQuestions) {
        let qst_submiss = new QSTSubMission();
        const found = this.availableQuestions.find((obj) => {
          return obj.question === qst;
        })
        if(found) {
          qst_submiss.question_id = found.id;
          qst_submiss.submission_id = this.addedSubmissionID;
          qst_submiss.answer = -1;
          this.qstSubmissionService.createQSTSubMission(qst_submiss).subscribe({
            next: (data) => {
              this.qstSubMissAdded = true;
              this.availableQSTsSubMissions = data;
            },
            error: (error) => {
              this.failedToAddQSTSubMiss = true;
              console.log("Error : " + error);
            }
          });
        } else {
          return;
        }
      }
    }
  }

}

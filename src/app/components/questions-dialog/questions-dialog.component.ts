import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mission } from 'src/app/models/mission';
import { QSTSubMission } from 'src/app/models/qst_submission';
import { Question } from 'src/app/models/question';
import { Submission } from 'src/app/models/submission';
import { MissionService } from 'src/app/services/mission.service';
import { QstSubmissionService } from 'src/app/services/qst-submission.service';
import { SubmissionService } from 'src/app/services/submission.service';

@Component({
  selector: 'app-questions-dialog',
  templateUrl: './questions-dialog.component.html',
  styleUrls: ['./questions-dialog.component.css']
})

export class QuestionsDialogComponent {

  availableQstsSubMissions: QSTSubMission[] = [];
  availableSubMissions: Submission[] = [];
  availableMissions: Mission[] = [];
  availableQuestions: Question[] = [];

  constructor(
    public dialogRef: MatDialogRef<QuestionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private qstSubMissService: QstSubmissionService,
    private subMisionSevice: SubmissionService,
    private missionService: MissionService
  ) { }



  ngOnInit(): void {
    this.availableMissions = this.data.availableMissions;
    this.availableSubMissions = this.data.availableSubMissions
    this.availableQstsSubMissions = this.data.qstsSubMissions;
    this.availableQuestions = this.data.availableQuestions;
  }



  getRelatedQSTs(): any {
    let questionsToAnswer: Question[] = [];
    const filteredQstSubMiss = this.availableQstsSubMissions.filter((obj) => {
      return obj.submission_id === this.data.submissionId;
    });
    for (let qst of filteredQstSubMiss) {
      let foundQST = this.availableQuestions.find((obj) => {
        return obj.id === qst.question_id;
      });
      if (foundQST) {
        questionsToAnswer.push(foundQST);
      }
    }
    return questionsToAnswer;
  }



  updateAnswer(qstId: number, answer: number): void {
    const foundQstSubMiss = this.availableQstsSubMissions.find((obj) => {
      return obj.submission_id === this.data.submissionId && obj.question_id === qstId;
    });
    if (foundQstSubMiss) {
      foundQstSubMiss.answer = answer;
      this.qstSubMissService
        .updateQSTSubMission(foundQstSubMiss)
        .subscribe({
          next: (data) => {
            this.availableQstsSubMissions = data;
          },
          error: (error) => {
            console.log("Error when updating QST-Submission: " + error);
          },
        });
    } else {
      console.log("No QST-Submission found!!");
    }
  }



  isAllQSTsAnswered(): boolean {
    const foundNotAnsweredQST = this.availableQstsSubMissions.find((obj) => {
      return obj.submission_id === this.data.submissionId && obj.answer === -1;
    });

    if (!foundNotAnsweredQST) {
      return true;
    } else {
      return false;
    }
  }



  getAnswer(qstId: number): number {
    const foundQSTSubmission = this.availableQstsSubMissions.find((obj) => {
      return obj.submission_id === this.data.submissionId && obj.question_id === qstId;
    });
    if (foundQSTSubmission?.answer) {
      return foundQSTSubmission.answer;
    }
    return -1;
  }



  finishSubMiss(): void {
    const foundSubMission = this.availableSubMissions.find((obj) => {
      return obj.id === this.data.submissionId;
    });
    if (foundSubMission) {
      let subMiss = new Submission();
      subMiss.id = foundSubMission.id;
      subMiss.name = foundSubMission.name;
      subMiss.status = 1;
      subMiss.mission_id = foundSubMission.mission_id
      this.subMisionSevice
          .updateSubMission(subMiss)
          .subscribe({
            next: (data) => {
              this.availableSubMissions = data;
              this.tryTofinishMission();
            },
            error: (error) => {
              console.log("Error when updating sub-mission: " + error);
            }
          })
    } else {
      console.log("No Submission found!!!");
    }
  }



  private tryTofinishMission(): void {
    const foundSubMission = this.availableSubMissions.find((obj) => {
      return obj.id === this.data.submissionId;
    });
    if(foundSubMission) {
      const missionId = foundSubMission.mission_id;
      const relatedSubMissions = this.availableSubMissions.filter((obj) => {
        return obj.mission_id === missionId;
      });
      if(relatedSubMissions.length > 0) {
        const foundNotCompletedSubMiss = relatedSubMissions.find((obj) => {
          return obj.status === 2;
        });
        if(!foundNotCompletedSubMiss) {
          const foundMission = this.availableMissions.find((obj) => {
            return obj.id === missionId;
          });
          if(foundMission) {
            // To get the index of the mission
            // the available missions array.
            let index = this.availableMissions.indexOf(foundMission);
            foundMission.status = 1;
            this.missionService
                .updateMission(foundMission)
                .subscribe({
                  next: (data) => {
                    const foundUpdatedMission = data.find( (obj) => {
                      return obj.id === foundMission.id;
                    });
                    if(foundUpdatedMission)
                      this.availableMissions[index] = foundUpdatedMission;
                  },
                  error: (error) => {
                    console.log("Error when updating mission status: " + error);
                  },
                })
          }
        } else {
          console.log("Not all submissions completed!!");
        }
      }
    }
  }

}

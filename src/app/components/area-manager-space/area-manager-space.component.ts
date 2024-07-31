import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuestionsDialogComponent } from '../questions-dialog/questions-dialog.component';
import { AffectationService } from 'src/app/services/affectation.service';
import { MissionService } from 'src/app/services/mission.service';
import { StoreService } from 'src/app/services/store.service';
import { GroupService } from 'src/app/services/group.service';
import { QuestionService } from 'src/app/services/question.service';
import { SubmissionService } from 'src/app/services/submission.service';
import { RegionService } from 'src/app/services/region.service';
import { SubregionService } from 'src/app/services/subregion.service';
import { QstSubmissionService } from 'src/app/services/qst-submission.service';
import { Affectation } from 'src/app/models/affectation';
import { Mission } from 'src/app/models/mission';
import { AreaManager } from 'src/app/models/area_manager';
import { Group } from 'src/app/models/group';
import { Region } from 'src/app/models/region';
import { Store } from 'src/app/models/store';
import { SubRegion } from 'src/app/models/subRegion';
import { Submission } from 'src/app/models/submission';
import { Visit } from 'src/app/models/visit';
import { QSTSubMission } from 'src/app/models/qst_submission';
import { VisitService } from 'src/app/services/visit.service';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-area-manager-space',
  templateUrl: './area-manager-space.component.html',
  styleUrls: ['./area-manager-space.component.css']
})

export class AreaManagerSpaceComponent {

  availableMissions: Mission[] = [];
  availableSubMissions: Submission[] = [];
  availableStores: Store[] = [];
  availableGroups: Group[] = [];
  availableQuestions: Question[] = [];
  availableRegions: Region[] = [];
  availableSubRegions: SubRegion[] = [];
  availableAffs: Affectation[] = [];
  availableAreaManagers: AreaManager[] = [];
  availableQstSubMiss: QSTSubMission[] = [];
  availableVisits: Visit[] = [];

  areaMangerId: number = 4;





  constructor (
    public dialog : MatDialog,
    private affService: AffectationService,
    private missionService: MissionService,
    private storeService: StoreService,
    private groupService: GroupService,
    private questionService: QuestionService,
    private subMissionService: SubmissionService,
    private qstSubmissionService: QstSubmissionService
  ){}



  ngOnInit():void {
    this.groupService
        .getGroups()
        .subscribe({
          next: (data) => {
            const foundGroup = data.find( (obj) =>{
              return obj.areamanager_id === this.areaMangerId;
            });
            this.storeService
                .getStores()
                .subscribe({
                  next: (data) => {
                    const filteredStores = data.filter( (obj) => {
                      return obj.group_id === foundGroup?.id;
                    });
                    this.affService
                        .getAffectations()
                        .subscribe({
                          next: (data) => {
                            for(let item of filteredStores) {
                              let affectedStores = data.filter( (obj) => {
                                return obj.store_id === item.id;
                              });
                              if(affectedStores) {
                                for(let affectedStore of affectedStores) {
                                  this.availableAffs.push(affectedStore);
                                }
                              }
                            }
                            this.missionService
                                .getMissions()
                                .subscribe({
                                  next: (data) => {
                                    for(let mission of data) {
                                      let foundMission = this.availableAffs.find( (obj) =>{
                                        return obj.mission_id === mission.id
                                      });
                                      if(foundMission){
                                        this.availableMissions.push(mission);
                                      }
                                    }
                                  },
                                  error: (error) => {
                                    console.log("Error when getting missions: " + error);
                                  }
                                });
                          },
                          error: (error) => {
                            console.log("Error when getting affectations: " + error);
                          }
                        })
                  },
                  error: (error) => {
                    console.log("Error when getting misisons: " + error);
                  }
                });
          },
          error: (error) => {
            console.log("Error when getting groups: " + error);
          }
        })
    // ----------------
    this.subMissionService
        .getSubmissions()
        .subscribe({
          next: (data) => {
            this.availableSubMissions = data;
          },
          error: (error) => {
            console.log("Error when getting submissions: " + error);
          }
        });
    // ----------------
    this.qstSubmissionService
        .getQSTsSubMissions()
        .subscribe({
          next: (data) => {
            this.availableQstSubMiss = data;
          },
          error: (error) => {
            console.log("Error when getting QSTs-Submissions: " + error);
          }
        });
    // ----------------
    this.questionService
        .getQuestions()
        .subscribe({
          next: (data) => {
            this.availableQuestions = data;
          },
          error: (error) => {
            console.log("Error when getting questions: " + error);
          }
        });
  }



  getRelatedSubMiss(missionId: number): any {
    const filteredSubMiss = this.availableSubMissions.filter( (obj) => {
      return obj.mission_id === missionId;
    });
    if(filteredSubMiss.length > 0) {
      return filteredSubMiss;
    } else {
      return [];
    }
  }


  openSubmissionsQst(submissionId : number, submissionName: string) {
    let dialogRef = this.dialog.open(QuestionsDialogComponent, {
      disableClose: true,
      width: "500px",
      data: { submissionId: submissionId, submissionName: submissionName, availableMissions: this.availableMissions, availableSubMissions: this.availableSubMissions, availableQuestions: this.availableQuestions, qstsSubMissions: this.availableQstSubMiss}
    });
  
    dialogRef.afterClosed().subscribe(data => {
      this.availableQstSubMiss = data.availableQstsSubMissions;
      this.availableSubMissions = data.availableSubMissions;
      this.availableMissions = data.availableMissions
    });
  }
  

}

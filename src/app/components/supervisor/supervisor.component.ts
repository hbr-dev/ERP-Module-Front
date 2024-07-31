import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMissionComponent } from '../add-mission/add-mission.component';
import { AddVisitComponent } from '../add-visit/add-visit.component';
import { MissionService } from 'src/app/services/mission.service';
import { Mission } from 'src/app/models/mission';
import { AddSubMissionComponent } from '../add-sub-mission/add-sub-mission.component';
import { SubmissionsDialogComponent } from '../submissions-dialog/submissions-dialog.component';
import { SubmissionService } from 'src/app/services/submission.service';
import { Submission } from 'src/app/models/submission';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/models/store';
import { RegionService } from 'src/app/services/region.service';
import { SubregionService } from 'src/app/services/subregion.service';
import { Region } from 'src/app/models/region';
import { SubRegion } from 'src/app/models/subRegion';
import { Affectation } from 'src/app/models/affectation';
import { AffectationService } from 'src/app/services/affectation.service';
import { AreaManager } from 'src/app/models/area_manager';
import { AreaManagerService } from 'src/app/services/area-manager.service';
import { GroupService } from 'src/app/services/group.service';
import { Group } from 'src/app/models/group';
import { VisitService } from 'src/app/services/visit.service';
import { Visit } from 'src/app/models/visit';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})



export class SupervisorComponent {

  availableMissions: Mission[] = [];
  availableSubMissions: Submission[] = [];
  availableStores: Store[] = [];
  availableGroups: Group[] = [];
  availableRegions: Region[] = [];
  availableSubRegions: SubRegion[] = [];
  availableAffs: Affectation[] = [];
  availableAreaManagers: AreaManager[] = [];
  availableVisits: Visit[] = [];
  
  affStoreId: number = -1;
  relatedMission: number = -1;

  displayFilterStatus = false;
  displayUpdateBtn: boolean = false;
  storeAffected: boolean = false;
  failedToAffect: boolean = false;
  inProgress: boolean = false;
  missionAffected: boolean = false;
  
  infoType = 'missions';
  availableAreaManager?: AreaManager;
  availableStore?: Store;

  visitDate?: Date;
  visitPlace?: string;
  visitAreaManager =  [];





  constructor(
    public dialog : MatDialog,
    private areamanagerService : AreaManagerService,
    private missionService: MissionService,
    private storeService: StoreService,
    private groupService: GroupService,
    private subMissionService: SubmissionService,
    private regionService: RegionService,
    private subRegionService: SubregionService,
    private affService: AffectationService,
    private visitService: VisitService,
    private datepipe: DatePipe
    ) {}



  ngOnInit(): void {
    this.areamanagerService
        .getAreaManagers()
        .subscribe({
          next: (data) => {
            this.availableAreaManagers = data;
          },
          error: (error) => {
            console.log("Error when getting area-managers: " + error);
          }
        });
    // ------------
    this.missionService
        .getMissions()
        .subscribe({
          next: (data) => {
            this.availableMissions = data;
            this.checkExpiredMissions();
          },
          error: (error) => {
            console.log("Error where getting missions: " + error);
          }
        });
    // ------------
    this.subMissionService
        .getSubmissions()
        .subscribe({
          next: (data) => {
            this.availableSubMissions = data;
          },
          error: (error) => {
            console.log("Error when getting sub-missions: " + error);
          }
        });
    // ------------
    this.storeService
        .getStores()
        .subscribe({
          next: (data) => {
            this.availableStores = data;
          },
          error: (error) => {
            console.log("Error when getting stores: " + error);
          }
        });
    // ------------
    this.groupService
        .getGroups()
        .subscribe({
          next: (data) => {
            this.availableGroups = data;
          },
          error: (error) => {
            console.log("Error when getting groups: " + error);
          }
        });
    // ------------
    this.regionService
        .getRegions() 
        .subscribe({
          next: (data) => {
            this.availableRegions = data;
          },
          error: (error) => {
            console.log("Error when getting regions: " + error);
          }
        });
    // ------------
    this.subRegionService
        .getSubRegions()
        .subscribe({
          next: (data) => {
            this.availableSubRegions = data;
          },
          error: (error) => {
            console.log("Error when getting sub-regions: " + error);
          }
        });
    // ------------
    this.affService
        .getAffectations()
        .subscribe({
          next: (data) => {
            this.availableAffs = data;
          },
          error: (error) => {
            console.log("Error when getting Affectations: " + error);
          }
        })
    // ------------
    this.visitService
        .getVisits()
        .subscribe({
          next: (data) => {
            this.availableVisits = data;
          },
          error: (error) => {
            console.log("Error when getting Visits: " + error);
          }
        });
  }



  private checkExpiredMissions(): any {
    let date = new Date();
    let misionsWithStatusUpdate = this.availableMissions;
    for(let mission of this.availableMissions) {
      if(mission.end_date) {
        const transformedMissDate = this.datepipe.transform(mission.end_date, 'yyyy-MM-dd');
        const transformedNowDate = this.datepipe.transform(date, 'yyyy-MM-dd');
        if(transformedMissDate !== null && transformedNowDate !== null) {
          if(transformedNowDate > transformedMissDate) {
            mission.status = -1;
            this.missionService
                .updateMission(mission)
                .subscribe({
                  next: (data) => {
                    misionsWithStatusUpdate = data;
                  },
                  error: (err) => {
                    console.log("Error when updating mission: " + err);
                  }
                });
          }
        }
      }
    }
    this.availableMissions =  misionsWithStatusUpdate;
  }



  getAreaManagerName(visitId: number): string {
    const foundVisit = this.availableVisits.find( (obj)=> {
      return obj.id === visitId;
    });
    const storeId = foundVisit?.store_id;
    const foundStore = this.availableStores.find( (obj)=> {
      return obj.id === storeId;
    });
    const groupId = foundStore?.group_id;
    const foundGroup = this.availableGroups.find( (obj)=> {
      return obj.id === groupId;
    });
    const areaManagerId = foundGroup?.areamanager_id;
    const foundAreaManager = this.availableAreaManagers.find( (obj)=> {
      return obj.id === areaManagerId;
    });
    if(foundAreaManager?.name) {
      return foundAreaManager?.name;
    }
    return "Failed to find area manager";
  }



  getStoreDetails(storeId: number):any {
    const foundStore = this.availableStores.find( (obj)=> {
      return obj.id === storeId;
    });
    let storeName = foundStore?.name;
    let storeLocation = this.getFullAddress(foundStore?.belongs_to?foundStore.belongs_to:-1);
    let storeAddress = foundStore?.address;
    return {storeName: storeName, storeLocation: storeLocation, storeAddress: storeAddress };
  }



  storeIsAvailable(missionId: number): boolean {
    const foundAff = this.availableAffs.find( (obj) => {
      return obj.mission_id === missionId;
    });
    const foundStore = this.availableStores.find( (obj) => {
      return obj.id === foundAff?.store_id;
    });
    this.availableStore = foundStore;
    const foundGroup = this.availableGroups.find( (obj) => {
      return obj.id === foundStore?.group_id;
    });
    const foundAreaManager = this.availableAreaManagers.find( (obj) => {
      return obj.id === foundGroup?.areamanager_id;
    });
    this.availableAreaManager = foundAreaManager;
    if(foundAreaManager) {
      return true;
    } else {
      return false;
    }
  }



  createAffectation(): void {
    if(this.displayUpdateBtn !== false && this.relatedMission > 0) {
      this.inProgress = true;
      let aff = new Affectation();
      aff.mission_id = this.relatedMission;
      aff.store_id = this.affStoreId;
      this.affService.createAffectation(aff).subscribe({
        next: (data) => {
          this.availableAffs = data;
          this.storeAffected = true;
          // this.inProgress = false;
        },
        error: (error) => {
          this.failedToAffect = true;
          // this.inProgress = false;
          console.log("Error when updating affectation: " + error)
        }
      });
    }
  }



  deleteAff(missionId: number): void {
    const foundAff = this.availableAffs.find( (obj) => {
      return obj.mission_id === missionId;
    });
    if(foundAff) {
      this.affService
          .deleteAff(foundAff)
          .subscribe({
            next: (data) => {
              this.availableAffs = data;
            },
            error: (error) => {
              console.log("Error when deleting affectation!!" + error);
            }
          });
    } else {
      console.log("Affectation not found!!");
    }
  }



  getFullAddress(belongs_to: number): string {
    const findSubRegion = this.availableSubRegions.find( (obj) => {
      return obj.id === belongs_to;
    });
    const findRegion = this.availableRegions.find( (obj) => {
      return obj.id === findSubRegion?.region_id;
    });
    return findRegion?.name + "-" + findSubRegion?.name;
  }



  displayUPBtn(missionId: number, storeId: any): void {
    if(storeId) {
      const found = this.availableStores.find( (obj) => {
        obj.group_id === 1;
      });
      if(!found) {
        this.displayUpdateBtn = true;
        this.affStoreId = storeId;
        this.relatedMission = missionId;
      }
    } else {
      console.log("Must select a related store!!");
    }
  }



  openAddMissionDialog() : void {
    let dialogRef = this.dialog.open(AddMissionComponent, {
      disableClose: true,
      width: "500px",
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if ( result ) {
        this.availableMissions = result;
      } else {
        console.log("No data returned when closing add mission dialog!");
      }
    });
  }



  openAddSubMissDialog(id: number): void {
    let dialogRef = this.dialog.open(AddSubMissionComponent, {
      width: "500px",
      data: { missionId: id }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.availableSubMissions = data;
    });
  }



  openSubMissDialog(id: number): void {
    this.dialog.open(SubmissionsDialogComponent, {
      width: "500px",
      data: { missionID: id },
    });
  }



  openAddVisitDialog() : void {
    let dialogRef = this.dialog.open(AddVisitComponent, {
      disableClose: true,
      width: "500px",
      data: { stores: this.availableStores, areamanagers: this.availableAreaManagers, groups: this.availableGroups, visits: this.availableVisits }
    });
  
    dialogRef.afterClosed().subscribe(data => {
      this.availableVisits = data;
    });

  }



  displayFilter(): void {
    this.displayFilterStatus = !this.displayFilterStatus;
  }



  subMissDetails(missionId: number): any {
    let subMissNBR = 0;
    let realizedSubMissNBR = 0;
    const filteredSubMiss = this.availableSubMissions.filter( (obj)=>{
      return obj.mission_id === missionId;
    });
    subMissNBR = filteredSubMiss.length;
    for(let item of filteredSubMiss) {
      if(item.status === 1)
        realizedSubMissNBR++;
    }
    return {subMissNBR: subMissNBR, realizedSubMissNBR: realizedSubMissNBR};
  }



  cancelVisit(visitId: number): void {
    const foundVisit = this.availableVisits.find( (obj) => {
      return obj.id === visitId;
    });
    if(foundVisit) {
      let visit = new Visit();
      visit.id = foundVisit.id;
      visit.visit_date = foundVisit.visit_date;
      visit.store_id = foundVisit.store_id;
      visit.status = -1;
      this.visitService
          .updateVisit(visit)
          .subscribe({
            next: (data) => {
              this.availableVisits = data;
            },
            error: (error) => {
              console.log("Error when updating visit: " + error);
            }
          })
    } else {
      console.log("Visit not found!!");
    }
  }



  deleteVisit(visitId: number):void {
    const foundVisit = this.availableVisits.find( (obj) => {
      return obj.id === visitId;
    });
    if(foundVisit){
    this.visitService
        .deleteVisit(foundVisit)
        .subscribe({
          next: (data) => {
            this.availableVisits = data;
          },
          error: (error) => {
            console.log("Error when deleting visit: " + error);
          }
        });
    } else {
      console.log("Visit not found!!!");
    }
  }
}

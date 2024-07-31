import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AreaManager } from 'src/app/models/area_manager';
import { AreaManagerService } from 'src/app/services/area-manager.service';

@Component({
  selector: 'app-affect-to-mission',
  templateUrl: './affect-to-mission.component.html',
  styleUrls: ['./affect-to-mission.component.css']
})

export class AffectToMissionComponent {

  areaManagers: AreaManager[] = [];
  selectedAreaManagers: boolean[] = [];

  inProgress: boolean = false;
  affected: boolean = false;
  notAffected: boolean = false;





  constructor(
    public dialogRef: MatDialogRef<AffectToMissionComponent>,
    private areaManagerService: AreaManagerService,
    @Inject(MAT_DIALOG_DATA) public affectedToMission: any
  ) { }


  ngOnInit(): void {
    this.inProgress = true;
    this.areaManagerService
        .getAreaManagers()
        .subscribe({
          next: (data) => {
            this.areaManagers = data;
            for(let i = 0; i < this.areaManagers.length; i++) {
              this.selectedAreaManagers.push(false);
            }
            this.inProgress = false;
          }, 
          error: (error) => {
            this.inProgress = false;
            console.log(error);
          }
        });
  }



  updateSelectedAreaManagers(index: number): void {
    this.selectedAreaManagers[index] = !this.selectedAreaManagers[index];
    // for (let i = 0; i < this.selectedAreaManagers.length; i++) {
    //   if (
    //       this.selectedAreaManagers[i]===true
    //       && this.affectedToMission.missionSelectedAreaManagers.indexOf(this.areaManagers[i].id) === -1
    //   ){
    //     this.affectedToMission.missionSelectedAreaManagers.push(this.areaManagers[i].id);
    //   }
    // }
  }


  affectAreaMangers(): void {
    console.log("selectedAreaManagers: " + this.selectedAreaManagers);
  }



  onCancel(): void {
    this.dialogRef.close();
  }

}

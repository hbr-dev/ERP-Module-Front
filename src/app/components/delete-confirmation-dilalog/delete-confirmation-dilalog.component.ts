import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AreaManager } from 'src/app/models/area_manager';
import { AreaManagerService } from 'src/app/services/area-manager.service';

@Component({
  selector: 'app-delete-confirmation-dilalog',
  templateUrl: './delete-confirmation-dilalog.component.html',
  styleUrls: ['./delete-confirmation-dilalog.component.css']
})

export class DeleteConfirmationDilalogComponent {

  inProgress = false;
  areaManagerDeleted = false;
  failedToDelete = false;

  areaManagers: AreaManager[] = [];





  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDilalogComponent>,
    private areaManagerService: AreaManagerService,
    @Inject(MAT_DIALOG_DATA) public areaManagerData: any
  ) { }



  ngOnInit(): void {
    this.inProgress = true;
    this.areaManagerService
        .getAreaManagers()
        .subscribe({
          next: (data) => {
            this.areaManagers = data;
            this.inProgress = false;
          },
          error: (error) => {
            this.inProgress = false;
            console.log(error);
          }
        })
  }



  deleteAreaManager(id: number): void {
    if(id > 0){
      this.inProgress = true;
      const found = this.areaManagers.find( (obj) => {
        return obj.id === id;
      });
      if(found) {
        this.areaManagerService.deleteAreaManager(found).subscribe({
          next: (data)=> {
            this.areaManagers = data;
            this.inProgress = false;
            this.areaManagerDeleted = true;
          },
          error: (error)=> {
            this.inProgress = false;
            this.failedToDelete = true;
            console.log(error);
          }
        })
      } else {
        this.inProgress = false;
        console.log("Area manager not found!");
        return;
      }
    } else {
      this.inProgress = false;
      console.log("Id is out of range");
    }
  }


  onCancel(): void {
    this.dialogRef.close();
  }

}

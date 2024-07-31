import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AreaManager } from 'src/app/models/area_manager';
import { AreaManagerService } from 'src/app/services/area-manager.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})

export class AddDialogComponent {

  areaManagers: AreaManager[] = [];

  areaManagerForm= new FormGroup({
    nameController: new FormControl('', [Validators.required]),
    emailController: new FormControl('', [Validators.required, Validators.email]),
  });

  inProgress = false;
  mailExist = false;
  areaManagerAdded = false;
  failedToAddAreaManager = false;





  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    private areaManagerService: AreaManagerService,
  ) {}



  ngOnInit(): void {
    this.areaManagerService
        .getAreaManagers()
        .subscribe({
          next: (data) => {
            this.areaManagers = data;
          },
          error: (error) => {
            console.log(error);
          }
        });
  }



  addAreaManager(): void {
    if(this.areaManagerForm.valid){
      this.inProgress = true;
      let area_manager = new AreaManager();
      if(this.areaManagerForm.value.nameController && this.areaManagerForm.value.emailController){
        area_manager.name = this.areaManagerForm.value.nameController;
        area_manager.email = this.areaManagerForm.value.emailController;
        const found = this.areaManagers.find( (obj)=>{
          return obj.email === this.areaManagerForm.value.emailController;
        });
        if(found){
          this.mailExist = true;
          this.inProgress = false;
        } else {
          this.areaManagerService.createAreaManager(area_manager).subscribe({
            next: (data) => {
              this.areaManagers = data;
              this.areaManagerAdded = true;
              this.inProgress = false;
            },
            error: (error) => {
              this.failedToAddAreaManager = true;
              this.inProgress = false;
              console.log(error);
            }
          });
        }
      } else {
        console.log("Name | email: null or empty");
      }
    } else {
      console.log("All fields must be valid");
    }
  }



  onCancel(): void {
    this.dialogRef.close();
  }

}

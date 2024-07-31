import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AreaManager } from 'src/app/models/area_manager';
import { AreaManagerService } from 'src/app/services/area-manager.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})

export class EditDialogComponent {

  inProgress: boolean = false;
  areaManagerEdited: boolean = false;
  failedToEdit: boolean = false;
  emailExists: boolean = false;

  areaManagers: AreaManager[] = []; 

  editAreaManagerForm = new FormGroup({
    nameController: new FormControl('', [Validators.required]),
    emailController: new FormControl('', [Validators.required, Validators.email]),
  });





  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    private areaManagerService: AreaManagerService,
    @Inject(MAT_DIALOG_DATA) public areaManagerData: any
  ) {}



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



  updateAreaManager(): void {
    if(this.editAreaManagerForm.valid) {
      this.inProgress = true;
      // -----------
      let area_manager = new AreaManager();
      area_manager.id = this.areaManagerData.areaManagerId;
      if(this.editAreaManagerForm.value.nameController) {
        area_manager.name = this.editAreaManagerForm.value.nameController;
      }
      else {
        this.inProgress = false;
        return;
      }
      if(this.editAreaManagerForm.value.emailController) {
        const filtredAreaManagers = this.areaManagers.filter( (obj) => {
          return (obj.id !== this.areaManagerData.areaManagerId && obj.email === this.editAreaManagerForm.value.emailController);
        });
        if(filtredAreaManagers.length > 0) {
          this.emailExists = true;
          this.inProgress = false;
          return;
        } else {
          area_manager.email = this.editAreaManagerForm.value.emailController;
        }
      }
      else {
        this.inProgress = false;
        return;
      }
      // -----------
      this.areaManagerService.updateAreaManager(area_manager).subscribe({
        next: (data) => {
          this.areaManagers = data;
          this.inProgress = false;
          this.areaManagerEdited = true;
        },
        error: (error) => {
          this.inProgress = false;
          this.failedToEdit = true;
          console.log(error);
        }
      });
    } else {
      this.inProgress = false;
      console.log("All fields must be valid!");
    }
  }

}



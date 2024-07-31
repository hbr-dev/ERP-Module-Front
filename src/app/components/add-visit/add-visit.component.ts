import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AreaManager } from 'src/app/models/area_manager';
import { Group } from 'src/app/models/group';
import { Store } from 'src/app/models/store';
import { Visit } from 'src/app/models/visit';
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-add-visit',
  templateUrl: './add-visit.component.html',
  styleUrls: ['./add-visit.component.css']
})

export class AddVisitComponent {

  availableStores: Store[] = [];
  availableAreamanagers: AreaManager[] = [];
  availableGroups: Group[] = [];
  availableVisits: Visit[] = [];

  selectedAreaManager: string = "Non définie";

  inProgress: boolean = false;
  visitAdded: boolean = false;
  failedToAddVisit: boolean = false;

  visitForm = new FormGroup({
    visitDate: new FormControl<Date | null>(null, [Validators.required]),
    storeId: new FormControl<number | null>(null, [Validators.required]),
  });





  constructor(
    @Inject(MAT_DIALOG_DATA) public visitData: any,
    private visitService: VisitService
  ) {}



  ngOnInit():void {
    this.availableStores = this.visitData.stores;
    this.availableAreamanagers = this.visitData.areamanagers;
    this.availableGroups = this.visitData.groups;
    this.availableVisits = this.visitData.visits;
  }



  updateAreaManager(storeId: number) {
    const foundStore = this.availableStores.find( (obj) => {
      return obj.id === storeId;
    });
    const foundGroup = this.availableGroups.find( (obj) => {
      return obj.id === foundStore?.group_id;
    });
    const foundAreaManager = this.availableAreamanagers.find( (obj) => {
      return obj.id === foundGroup?.areamanager_id;
    });
    if(foundAreaManager?.name)
      this.selectedAreaManager = foundAreaManager.name;
  }



  addVisit():void {
    if(this.visitForm.valid) {
      if(this.visitForm.value.storeId && this.visitForm.value.visitDate) {
        this.inProgress = true;
        let visit = new Visit();
        console.log("Visit form visitdate: " + this.visitForm.value.visitDate);
        visit.visit_date = this.visitForm.value.visitDate;
        console.log("Visit date: " + visit.visit_date.toISOString);
        visit.store_id = this.visitForm.value.storeId;
        visit.status = 2;
        this.visitService
            .createVisit(visit)
            .subscribe({
              next: (data) => {
                this.availableVisits = data;
                this.inProgress = false;
                this.visitAdded = true;
              },
              error: (error) => {
                this.inProgress = false;
                this.failedToAddVisit = true;
                console.log("Error when creating visit" + error);
              }
            });
      } else {
        this.inProgress = false;
        return;
      }
    } else {
      console.log("All fields must be valid");
    }
  }

}

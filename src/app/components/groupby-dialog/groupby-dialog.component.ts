import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Affectation } from 'src/app/models/affectation';
import { Group } from 'src/app/models/group';
import { Store } from 'src/app/models/store';
import { AffectationService } from 'src/app/services/affectation.service';
import { GroupService } from 'src/app/services/group.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-groupby-dialog',
  templateUrl: './groupby-dialog.component.html',
  styleUrls: ['./groupby-dialog.component.css']
})


export class GroupbyDialogComponent {

  inProgress: boolean = false;
  groupNameExist: boolean = false;
  failedToGroup: boolean = false;
  groupped: boolean = false;

  availableGroups: Group[] = [];

  groupForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
  });





  constructor(
    public dialogRef: MatDialogRef<GroupbyDialogComponent>,
    private groupService: GroupService,
    private storeService: StoreService,
    @Inject(MAT_DIALOG_DATA) public groupData: any
  ) { }



  group(): void {
    if (this.groupForm.valid) {
      this.inProgress = true;
      let group = new Group();
      group.name = this.groupForm.value.name ? this.groupForm.value.name : "Not Available";
      group.areamanager_id = this.groupData.areaManager;
      this.groupService.createGroup(group).subscribe({
        next: (data) => {
          this.availableGroups = data;
          this.updateStoresGroups();
          this.inProgress = false;
          this.groupped = true;
        },
        error: (err) => {
          this.inProgress = false;
          this.failedToGroup = true;
          console.log("Error when creating a new group: " + err);
        }
      })
    } else {
      console.log("All fields must be valid.");
    }
  }



  private updateStoresGroups(): void {
    let groupId = this.availableGroups[this.availableGroups.length - 1].id;
    let selectedStores = this.groupData.storesToGroup;
    for (let item of selectedStores) {
      let store = new Store();
      store.id = item.id;
      store.name = item.name;
      store.address = item.address;
      store.belongs_to = item.belongs_to;
      store.group_id = groupId;
      this.storeService.updateStore(store).subscribe({
        next: () => {},
        error: (err) => {
          console.log(err);
        }
      });
    }
  }



  onCancel(): void {
    this.dialogRef.close();
  }

}

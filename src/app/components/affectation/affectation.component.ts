import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { GroupbyDialogComponent } from '../groupby-dialog/groupby-dialog.component';
import { Store } from 'src/app/models/store';
import { StoreService } from 'src/app/services/store.service';
import { AddStoreDialogComponent } from '../add-store-dialog/add-store-dialog.component';
import { AreaManager } from 'src/app/models/area_manager';
import { AreaManagerService } from 'src/app/services/area-manager.service';

@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.css']
})

export class AffectationComponent {

  availableStores: Store[] = [];
  availableAreaManagers: AreaManager[] = [];
  filteredAreaManagers: AreaManager[] = [];
  selectedStoresList: Store[] = [];

  groupName = "";
  
  selectedAreaManager?: AreaManager;
  selectedStoreIndex = -1;
  selectedStoresNBR = 0;
  previousSelectedStore = -1;





  constructor(
    public dialog : MatDialog,
    private storeService : StoreService,
    private areaManagerService : AreaManagerService,
  ) {}



  ngOnInit(): void {
    this.storeService
        .getStores()
        .subscribe({
          next: (data) => {
            this.availableStores = data;
          },
          error: (error) => {
            console.log("Error when getting available stores: " + error);
          }
        });
    // -----------------
    this.areaManagerService
        .getAreaManagers()
        .subscribe({
          next: (data) => {
            this.availableAreaManagers = data;
            this.filteredAreaManagers = data;
          },
          error: (error) => {
            console.log(error);
          }
        });
  }



  openAddStoreDialog():void {
    let dialogRef = this.dialog.open(AddStoreDialogComponent, {
      disableClose: true,
      width: "500px",
    });

    dialogRef.afterClosed().subscribe( (result) => {
      this.availableStores = result;
    });
  }



  updateSelectedAreaManager(id: number): void {
    if(this.selectedAreaManager?.id === id) {
      this.selectedAreaManager = undefined;
    } else {
      this.selectedAreaManager = new AreaManager();
      this.selectedAreaManager = this.availableAreaManagers.find( (obj) => {
        return obj.id === id;
      });
    }
  }



  updateSelectedStoreList(store: Store) {
    let index = this.selectedStoresList.indexOf(store);
    if(index !== -1) {
      this.selectedStoresList.splice(index, 1);
    } else {
      this.selectedStoresList.push(store);
    }
  }



  openFilterDialog(): void {
    let dialogRef = this.dialog.open(FilterDialogComponent, {
      disableClose: true,
      width: '500px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.availableStores = result;
    });
  }



  openGroupByDialog(): void {
    if(this.selectedStoresList.length > 0 && this.selectedAreaManager !== undefined) {
      let dialogRef = this.dialog.open(GroupbyDialogComponent, {
        disableClose: true,
        width: "500px",
        data: { storesToGroup: this.selectedStoresList, areaManager: this.selectedAreaManager.id}
      });
    
      dialogRef.afterClosed().subscribe(result => {
        this.groupName = result;
        console.log("Result: " + this.groupName);
      });
    } else {}
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredAreaManagers = this.availableAreaManagers.filter( (obj) => {
      return obj.name?.toLowerCase().includes(filterValue.toLowerCase());
    });
  }

}

import { Component } from '@angular/core';
import { AreaManager } from 'src/app/models/area_manager';
import { Group } from 'src/app/models/group';
import { Store } from 'src/app/models/store';
import { Visit } from 'src/app/models/visit';
import { AreaManagerService } from 'src/app/services/area-manager.service';
import { GroupService } from 'src/app/services/group.service';
import { StoreService } from 'src/app/services/store.service';
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-store-manager-space-v',
  templateUrl: './store-manager-space-v.component.html',
  styleUrls: ['./store-manager-space-v.component.css']
})

export class StoreManagerSpaceVComponent {


  availableVisits: Visit[]= [];

  private availableStores: Store[]=[];
  private availableGroups: Group[]=[];
  private availableAreaManagers: AreaManager[]=[];

  storeId: number = 1;





  constructor(
    private visitService: VisitService,
    private storeService: StoreService,
    private areaMangerService: AreaManagerService,
    private groupService: GroupService
  ) {}



  ngOnInit(): void {
    this.visitService
        .getVisits()
        .subscribe({
          next: (data) => {
            const filteredVisits = data.filter( (obj) => {
              return obj.store_id === this.storeId;
            })
            if(filteredVisits.length > 0) {
              this.availableVisits = filteredVisits;
              this.bindStores();
              this.bindAreaMangers();
              this.bindGroups();
            }
          },
          error: (error) => {
            console.log("Error when getting visits: " + error);
          }
        })
  }



  private bindAreaMangers() {
    this.areaMangerService
        .getAreaManagers()
        .subscribe({
          next: (data) => {
            this.availableAreaManagers = data;
          },
          error: (error) => {
            console.log("Error when getting AreaManagers: " + error);
          }
        })
  }



  private bindStores() {
    this.storeService
        .getStores()
        .subscribe({
          next: (data) => {
            this.availableStores = data;
          },
          error: (error) => {
            console.log("Error when getting stores: " + error);
          }
        })
  }



  private bindGroups() {
    this.groupService
        .getGroups()
        .subscribe({
          next: (data) => {
            this.availableGroups = data;
          },
          error: (error) => {
            console.log("Error when getting groups: " + error);
          }
        })
  }



  getAreaMangerName(storeId: number): string {
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



}

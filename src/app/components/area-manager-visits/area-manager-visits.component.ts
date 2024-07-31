import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AreaManager } from 'src/app/models/area_manager';
import { Group } from 'src/app/models/group';
import { Region } from 'src/app/models/region';
import { Store } from 'src/app/models/store';
import { SubRegion } from 'src/app/models/subRegion';
import { Visit } from 'src/app/models/visit';
import { AreaManagerService } from 'src/app/services/area-manager.service';
import { GroupService } from 'src/app/services/group.service';
import { RegionService } from 'src/app/services/region.service';
import { StoreService } from 'src/app/services/store.service';
import { SubregionService } from 'src/app/services/subregion.service';
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-area-manager-visits',
  templateUrl: './area-manager-visits.component.html',
  styleUrls: ['./area-manager-visits.component.css']
})

export class AreaManagerVisitsComponent {

  availableVisits: Visit[] = [];
  availableGroups: Group[] = [];
  availableRegions: Region[] = [];
  availableSubRegions: SubRegion[] = [];
  availableAreaManagers: AreaManager[] = [];
  
  private availableStores: Store[] = [];

  areamanagerId: number = 4;





  constructor(
    private visitService: VisitService,
    private storeService: StoreService,
    private groupService: GroupService,
    private regionService: RegionService,
    private subRegionService: SubregionService,
    private areamanagerService: AreaManagerService,
    private datepipe: DatePipe
  ) { }



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
    this.groupService
      .getGroups()
      .subscribe({
        next: (data) => {
          this.availableGroups = data;
          const foundGroup = data.find((obj) => {
            return obj.areamanager_id === this.areamanagerId;
          });
          if (foundGroup) {
            this.storeService
              .getStores()
              .subscribe({
                next: (data) => {
                  this.availableStores = data;
                  const filteredStores = data.filter((obj) => {
                    return obj.group_id === foundGroup.id;
                  });
                  if (filteredStores.length > 0) {
                    this.visitService
                      .getVisits()
                      .subscribe({
                        next: (data) => {
                          for (let visit of data) {
                            const relatedVisit = filteredStores.find((obj) => {
                              return obj.id === visit.store_id;
                            });
                            if (relatedVisit) {
                              this.availableVisits.push(this.updateExpiredVisit(visit));
                            } else {
                              console.log("Ther is no available visit!!!");
                            }
                          }
                        },
                        error: (error) => {
                          console.log("Error when getting visits: " + error);
                        }
                      });
                  } else {
                    console.log("Can't find adequat stores");
                  }
                },
                error: (error) => {
                  console.log("Error when getting stores: " + error);
                }
              });
          }
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
  }



  getAreaManagerName(visitId: number): string {
    const foundVisit = this.availableVisits.find((obj) => {
      return obj.id === visitId;
    });
    const storeId = foundVisit?.store_id;
    const foundStore = this.availableStores.find((obj) => {
      return obj.id === storeId;
    });
    const groupId = foundStore?.group_id;
    const foundGroup = this.availableGroups.find((obj) => {
      return obj.id === groupId;
    });
    const areaManagerId = foundGroup?.areamanager_id;
    const foundAreaManager = this.availableAreaManagers.find((obj) => {
      return obj.id === areaManagerId;
    });
    if (foundAreaManager?.name) {
      return foundAreaManager?.name;
    }
    return "Failed to find area manager";
  }



  getStoreDetails(storeId: number): any {
    const foundStore = this.availableStores.find((obj) => {
      return obj.id === storeId;
    });
    let storeName = foundStore?.name;
    let storeLocation = this.getFullAddress(foundStore?.belongs_to ? foundStore.belongs_to : -1);
    let storeAddress = foundStore?.address;
    return { storeName: storeName, storeLocation: storeLocation, storeAddress: storeAddress };
  }



  getFullAddress(belongs_to: number): string {
    const findSubRegion = this.availableSubRegions.find((obj) => {
      return obj.id === belongs_to;
    });
    const findRegion = this.availableRegions.find((obj) => {
      return obj.id === findSubRegion?.region_id;
    });
    return findRegion?.name + "-" + findSubRegion?.name;
  }



  accomplichVisit(visitId: number): void {
    const foundVisit = this.availableVisits.find((obj) => {
      return obj.id === visitId;
    });

    if (foundVisit) {
      let index = this.availableVisits.indexOf(foundVisit);
      foundVisit.status = 1;
      this.visitService
        .updateVisit(foundVisit)
        .subscribe({
          next: (data) => {
            const foundUpdatedVist = data.find((obj) => {
              return obj.id === foundVisit.id;
            });
            if (foundUpdatedVist) {
              this.availableVisits[index] = foundUpdatedVist;
            } else {
              console.log("On subscribe can't find updated visit!!");
            }
          },
          error: (error) => {
            console.log("Error when updating visit status: " + error);
          }
        });
    } else {
      console.log("Failed to found visit!!");
    }
  }



  private updateExpiredVisit(visit: Visit): Visit {
    let date = new Date();
    let visitToReturn = visit;
    const transformedVistDate = this.datepipe.transform(visit.visit_date, 'yyyy-MM-dd');
    const transformedNowDate = this.datepipe.transform(date, 'yyyy-MM-dd');
    if (transformedVistDate !== null && transformedNowDate !== null) {
      if (transformedNowDate > transformedVistDate) {
        visit.status = -1;
        this.visitService
          .updateVisit(visit)
          .subscribe({
            next: (data) => {
              const foundUpdatedVist = data.find( (obj) => {
                return obj.id === visit.id;
              });
              if(foundUpdatedVist)
                visitToReturn = foundUpdatedVist;
            },
            error: (err) => {
              console.log("Error when updating visit status: " + err);
            }
          });
      } 
    }
    return visitToReturn;
  }



  itsDate(visit: Visit): boolean {
    let date = new Date();
    const transformedVistDate = this.datepipe.transform(visit.visit_date, 'yyyy-MM-dd');
    const transformedNowDate = this.datepipe.transform(date, 'yyyy-MM-dd');
    if(transformedVistDate == transformedNowDate) {
      return true;
    } else {
      return false;
    }
  }



}

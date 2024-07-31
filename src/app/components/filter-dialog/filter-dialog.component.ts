import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Region } from 'src/app/models/region';
import { Store } from 'src/app/models/store';
import { SubRegion } from 'src/app/models/subRegion';
import { RegionService } from 'src/app/services/region.service';
import { StoreService } from 'src/app/services/store.service';
import { SubregionService } from 'src/app/services/subregion.service';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})

export class FilterDialogComponent {
  
  availableRegions: Region[] = [];
  availableSubRegions: SubRegion[] = [];
  filteredSubRegions: SubRegion[] = [];
  availableStores: Store[] = [];
  filteredStores: Store[] = [];

  selecetedReg = "Tunis";
  selecetedSubReg = "Ariana";
  




  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    private regionService: RegionService,
    private subRegionService: SubregionService,
    private storeService: StoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
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
    // ----------------
    this.subRegionService
        .getSubRegions()
        .subscribe({
          next: (data) => {
            this.availableSubRegions = data;
            this.filteredSubRegions = data;
          },
          error: (error) => {
            console.log("Error when getting sub-regions: " + error);
          }
        });
        // ----------------
        this.storeService
            .getStores()
            .subscribe({
              next: (data) => {
                this.availableStores = data;
                this.filteredStores = data;
              },
              error: (error) => {
                console.log("Error when getting stores: " + error);
              }
            });
  }



  updateSubRegionsList(value: any): void {
    const found = this.availableRegions.find( (obj) => {
      return obj.name === value.name;
    });
    // ---------
    if (found) {
      this.filteredSubRegions = this.availableSubRegions;
      const filtered = this.availableSubRegions.filter( (obj) => {
        return obj.region_id === found.id;
      });
      this.filteredSubRegions = filtered;
    } else {
      console.log("No sub-regions found for this region!");
    }
  }



  updateStoresList(value: any): void {
    const filter = this.availableStores.filter( (obj) => {
      return obj.belongs_to === value.id;
    });
    // ---------
    if (filter.length > 0) {
      this.filteredStores = filter;
    } else {
       this.filteredStores = this.availableStores;
    }
  }

  
}

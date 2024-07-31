import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Region } from 'src/app/models/region';
import { Store } from 'src/app/models/store';
import { SubRegion } from 'src/app/models/subRegion';
import { RegionService } from 'src/app/services/region.service';
import { StoreService } from 'src/app/services/store.service';
import { SubregionService } from 'src/app/services/subregion.service';

@Component({
  selector: 'app-add-store-dialog',
  templateUrl: './add-store-dialog.component.html',
  styleUrls: ['./add-store-dialog.component.css']
})

export class AddStoreDialogComponent {

  inProgress: boolean = false;
  storeAdded: boolean = false;
  failedToAdd: boolean = false;
  storeExist: boolean = false;

  availableSubRegions: SubRegion[] = [];
  availableRegions: Region[] = [];
  filteredSubRegions: SubRegion[] = [];
  availableStores: Store[] = [];

  storeForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    address: new FormControl("", [Validators.required]),
    region: new FormControl<Region | null>(null, [Validators.required]),
    subReg: new FormControl<SubRegion | null>(null, [Validators.required]),
  });





  constructor(
    private subRegionService: SubregionService,
    private regionService: RegionService,
    private storeService: StoreService
  ) {}



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
          },
          error: (error) => {
            console.log("Error when getting avaialable stores: " + error);
          }
        })
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



  addStore(): void {
    if(this.storeForm.valid) {
      this.inProgress = true;
      let store = new Store();
      if(this.storeForm.value.name &&
         this.storeForm.value.address &&
         this.storeForm.value.region && 
         this.storeForm.value.subReg
      ){
        store.name = this.storeForm.value.name;
        store.address = this.storeForm.value.address;
        let subRegionName = this.storeForm.value.subReg.name;
        let found = this.availableSubRegions.find( (obj) => {
          return obj.name === subRegionName; 
        })
        store.group_id = 1;
        store.belongs_to = found?.id;
        found = this.availableStores.find( (obj) => {
          return obj.address === this.storeForm.value.address && obj.belongs_to === this.storeForm.value.subReg?.id;
        });
        if(found) {
          this.inProgress = false;
          this.storeExist = true;
          return;
        }
        this.storeService
            .createStore(store)
            .subscribe({
              next: (data) => {
                this.availableStores = data;
                this.storeAdded = true;
                this.inProgress = false;
              },
              error: (error) => {
                this.inProgress = false;
                this.failedToAdd = true;
                console.log("Error when creating store: " + error);
              }
            });
      }
    } else {
      this.inProgress = false;
      console.log("Adding a new store failed: all fields must be valid!");
    }
  }

}

import { Component } from '@angular/core';
import { Mission } from 'src/app/models/mission';
import { AffectationService } from 'src/app/services/affectation.service';
import { AreaManagerService } from 'src/app/services/area-manager.service';
import { GroupService } from 'src/app/services/group.service';
import { MissionService } from 'src/app/services/mission.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store-manager-space-m',
  templateUrl: './store-manager-space-m.component.html',
  styleUrls: ['./store-manager-space-m.component.css']
})

export class StoreManagerSpaceMComponent {

  availableMissions: Mission[]= [];

  storeId: number = 1;





  constructor(
    private missionService: MissionService,
    private affService: AffectationService
  ) {}



  ngOnInit(): void {
    this.affService
        .getAffectations()
        .subscribe({
          next: (data) => {
            const relatedAffsToStore = data.filter( (obj) => {
              return obj.store_id = this.storeId;
            });
            this.missionService
                .getMissions()
                .subscribe({
                  next: (data) => {
                    for(let mission of data) {
                      const relatedMission = relatedAffsToStore.find( (obj) => {
                        return obj.mission_id === mission.id
                      });
                      if(relatedMission)
                        this.availableMissions.push(mission);
                    }
                  },
                  error: (error) => {
                    console.log("Error when getting missions: " + error);
                  }
                });
          },
          error: (error) => {
            console.log("Error when getting affectatins: " + error);
          }
        })
  }


}

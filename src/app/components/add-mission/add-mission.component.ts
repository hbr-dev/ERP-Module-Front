import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from '../../models/subject';
import { SubjectService } from 'src/app/services/subject.service';
import { Mission } from 'src/app/models/mission';
import { MissionService } from 'src/app/services/mission.service';

@Component({
  selector: 'app-add-mission',
  templateUrl: './add-mission.component.html',
  styleUrls: ['./add-mission.component.css']
})

export class AddMissionComponent {
  
  availableSubjects: Subject[] = [];
  availableMissions: Mission[] = [];

  addNewSubject = false;
  subjNameExist = false;
  inProgress = false;
  subjAdded = false;
  missionAdded = false;
  failedToSaveMission = false;
  subjAdditionFailed = false;
  
  missionForm = new FormGroup({
    missionName: new FormControl("", [Validators.required]),
    missionDescription: new FormControl("", [Validators.required]),
    missionSubject: new FormControl("", [Validators.required]),
    startDate: new FormControl<Date | null>(null, [Validators.required]),
    endDate: new FormControl<Date | null>(null, [Validators.required]),
  });

  subjectForm = new FormGroup({
    subjName : new FormControl("", [Validators.required]),
  });





  constructor(
    private subjectService: SubjectService,
    private missionService: MissionService,
  ) { }




  ngOnInit(): void {
    this.subjectService
        .getSubjects()
        .subscribe({
          next: (data) => {
            this.availableSubjects = data;
          },
          error: (error) => {
            console.log("Error when getting available subjects: " + error);
          }
        });
    // ----------------
    this.missionService
        .getMissions()
        .subscribe({
          next: (data) => {
            this.availableMissions = data;
          },
          error: (error) => {
            console.log(error);
          }
        });
  }



  updateDialogContent() {
    this.addNewSubject = !this.addNewSubject;
    this.subjNameExist = false;
    this.subjAdded = false;
    this.subjAdditionFailed = false;
  }



  addSubject(): void {
    if(this.subjectForm.value.subjName !== null && this.subjectForm.value.subjName !== undefined && this.subjectForm.value.subjName.length > 0) {
      const found = this.availableSubjects.find( (subject) => {
        return subject.name === this.subjectForm.value.subjName
      });
      if (!found) {
        this.subjNameExist = false;
        this.inProgress = true;
        let subj = new Subject();
        subj.name = this.subjectForm.value.subjName;
        this.subjectService.createSubject(subj).subscribe({
          next: (data) => {
            this.inProgress = false;
            this.subjAdded = true;
            this.availableSubjects.push({id: data[data.length-1].id, name: data[data.length-1].name});
          },
          error: (error) => {
            this.inProgress = false;
            this.subjAdditionFailed = true;
            console.log("Error when creating sub-mission: " + error);
          }
        }
        );
      } else {
        this.subjNameExist = true;
      }
    }
  }



  addMission(): void {
    if(this.missionForm.valid) {
      this.inProgress = true;
      let mission = new Mission();
      // ---------
      if(this.missionForm.value.missionName !== null)
        mission.name = this.missionForm.value.missionName;
      else
        return;
      // ---------
      if(this.missionForm.value.missionDescription !== null)
        mission.descriprtion = this.missionForm.value.missionDescription;
      else
        return;
      // ----------
      if(this.missionForm.value.startDate  !== null){
        console.log(this.missionForm.value.startDate)
        mission.start_date = this.missionForm.value.startDate;
      }
      else
        return;
      // -----------
      if(this.missionForm.value.endDate  !== null) {
        mission.end_date = this.missionForm.value.endDate;
      }
      else
        return;
      // -----------
      if(this.missionForm.value.missionSubject) {
        const found = this.availableSubjects.find( (obj) => {
          return obj.name === this.missionForm.value.missionSubject;
        });
        if(found){
          mission.subject_id = found.id;
        } 
      } else
        return;
      // ------------
      mission.status = 2;
      this.missionService.createMission(mission).subscribe({
        next: (data) => {
          this.inProgress = false;
          this.missionAdded = true;
          this.availableMissions = data
        },
        error: (error) => {
          this.inProgress = false;
          this.failedToSaveMission = true;
          console.log("Error when creating mission: " + error);
        }
      });
      this.inProgress = false;
    } else {
      console.log("All fields must be valid!");
    }
  }
}

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicStrectureComponent } from './components/basic-strecture/basic-strecture.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SupervisorComponent } from './components/supervisor/supervisor.component';
import { AffectationComponent } from './components/affectation/affectation.component';
import { FilterDialogComponent } from './components/filter-dialog/filter-dialog.component';
import { GroupbyDialogComponent } from './components/groupby-dialog/groupby-dialog.component';
import { AddMissionComponent } from './components/add-mission/add-mission.component';
import { AddVisitComponent } from './components/add-visit/add-visit.component';
import { AffectToMissionComponent } from './components/affect-to-mission/affect-to-mission.component';
import { AreaManagerManagementComponent } from './components/area-manager-management/area-manager-management.component';
import { DeleteConfirmationDilalogComponent } from './components/delete-confirmation-dilalog/delete-confirmation-dilalog.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { AreaManagerSpaceComponent } from './components/area-manager-space/area-manager-space.component';
import { QuestionsDialogComponent } from './components/questions-dialog/questions-dialog.component';
import { StoreManagerSpaceMComponent } from './components/store-manager-space-m/store-manager-space-m.component';
import { StoreManagerSpaceVComponent } from './components/store-manager-space-v/store-manager-space-v.component';
import { AddSubMissionComponent } from './components/add-sub-mission/add-sub-mission.component';
import { SubmissionsDialogComponent } from './components/submissions-dialog/submissions-dialog.component';
import { AddStoreDialogComponent } from './components/add-store-dialog/add-store-dialog.component';
import { DatePipe } from '@angular/common';
import { AreaManagerVisitsComponent } from './components/area-manager-visits/area-manager-visits.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicStrectureComponent,
    SupervisorComponent,
    AffectationComponent,
    FilterDialogComponent,
    GroupbyDialogComponent,
    AddMissionComponent,
    AddVisitComponent,
    AffectToMissionComponent,
    AreaManagerManagementComponent,
    DeleteConfirmationDilalogComponent,
    EditDialogComponent,
    AddDialogComponent,
    AreaManagerSpaceComponent,
    QuestionsDialogComponent,
    StoreManagerSpaceMComponent,
    StoreManagerSpaceVComponent,
    AddSubMissionComponent,
    SubmissionsDialogComponent,
    AddStoreDialogComponent,
    AreaManagerVisitsComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSidenavModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTableModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

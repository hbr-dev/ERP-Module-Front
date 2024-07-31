import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteConfirmationDilalogComponent } from '../delete-confirmation-dilalog/delete-confirmation-dilalog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { AreaManagerService } from 'src/app/services/area-manager.service';
import { AreaManager } from 'src/app/models/area_manager';


export interface UserData {
  id: number;
  name: string;
  email: string;
}

const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];


@Component({
  selector: 'app-area-manager-management',
  templateUrl: './area-manager-management.component.html',
  styleUrls: ['./area-manager-management.component.css']
})

export class AreaManagerManagementComponent {

  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];  
  dataSource?: MatTableDataSource<AreaManager>;

  areaManagerId!: number;
  areaManagerName!: string;
  areaManagerEmail!: string;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;





  constructor(
      public dialog : MatDialog,
      private areaManagerService: AreaManagerService
  ) {}



  ngOnInit(): void {
    this.areaManagerService
        .getAreaManagers()
        .subscribe({
          next: (data)=>{
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error: (error)=>{
            console.log(error);
          }
        })
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    } else {
      console.log("dataSource in not defined");
    }

  }



  openDeleteConfirmationDialog( row : any) {
    let dialogRef = this.dialog.open(DeleteConfirmationDilalogComponent, {
      disableClose: true,
      width: "320px",
      data: { areaManagerId: row.id }
    });

    dialogRef.afterClosed().subscribe(data => {
      if ( data ) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }



  openEditDialog( row : any) {
    let dialogRef = this.dialog.open(EditDialogComponent, {
      disableClose: true,
      width: "320px",
      data: { areaManagerId: row.id, areaManagerName: row.name, areaManagerEmail: row.email }
    });

    dialogRef.afterClosed().subscribe(data => {
      if ( data ) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }



  openAddDialog() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      disableClose: true,
      width: "320px"
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}

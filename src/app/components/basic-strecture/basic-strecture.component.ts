import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface SideBarNodes {
  name: string;
  children?: SideBarNodes[];
}

const TREE_DATA: SideBarNodes[] = [
  {
    name: 'FO BO/ Superviseur',
    children: [{name: 'Créer un area manager'}, {name: 'Affecter un area manager a un groupe des stores'}, {name: 'Plans de visites et missions'}],
  },
  {
    name: 'Area-Manager',
    children: [{name: 'Mes missions'}, {name: 'Mes visites'}]
  },
  {
    name: 'Store-Manager',
    children: [{name: 'Consulter missions'}, {name: 'Consulter visites'}]
  }
];

/** Flat node with expandable and level information */
interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-basic-strecture',
  templateUrl: './basic-strecture.component.html',
  styleUrls: ['./basic-strecture.component.css']
})

export class BasicStrectureComponent {

  pageContentMapper = 1; 
  parentNode = 1;

  missionName?: string;
  missionCode?: string;
  missionDescription?: string;
  missionStatus?: string;
  missionSubjectId?: number;

  private _transformer = (node: SideBarNodes, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };  

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable,
  )

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  updatePageContent(node: SideBarNodes) {
    switch(node.name) {
      case "Créer un area manager":
        this.pageContentMapper = 1;
        this.parentNode = 1;
        break;
      case "Affecter un area manager a un groupe des stores":
        this.pageContentMapper = 2;
        this.parentNode = 1;
        break;
      case "Plans de visites et missions":
        this.pageContentMapper = 3;
        this.parentNode = 1;
        break;
      case "Mes missions":
        this.pageContentMapper = 4;
        this.parentNode = 2;
        break;
      case "Mes visites":
        this.pageContentMapper = 5;
        this.parentNode = 2;
        break;
      case 'Consulter missions':
        this.pageContentMapper = 6;
        this.parentNode = 3;
        break; 
      case 'Consulter visites':
        this.pageContentMapper = 7;
        this.parentNode = 3;
        break;
    }
  }


  // openAddMissionDialog(): void {
  //   let dialogRef = this.dialog.open(AddMissionComponent, {
  //     missionData: { missionName: this.missionName, missionCode: this.missionCode, missionDescription: this.missionDescription, missionStatus: this.missionStatus, missionSubjectId: this.missionSubjectId}
  //   });
  
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.missionName = result.missionName;
  //     this.missionCode = result.missionCode;
  //     this.missionDescription = result.missionDescription;
  //     this.missionStatus = result.missionStatus;
  //     this.missionSubjectId = result.missionSubjectId;
  //     console.log("Result: " + result);
  //   });
  // }


}

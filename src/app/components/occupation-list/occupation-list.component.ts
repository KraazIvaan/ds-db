import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Occupation } from '../../classes/occupation';
import { OccupationService } from '../../services/occupation/occupation.service';

//import * as firebase from 'firebase/app';// commented for upgrade 13mar2021

@Component({
  selector: 'list',
  templateUrl: './occupation-list.component.html',
  styleUrls: ['./occupation-list.component.css']
})
export class OccupationListComponent {
  email = '';
  title = 'Occupations';
  occupations: Occupation[];
  editedOccupation: Occupation;
  selectedOccupation: Occupation;
  filterStr = '';
  
  constructor(
    private router: Router,
    private occupationService: OccupationService
  ) { }

  getOccupations(): void {
    this.occupationService.getOccupations().subscribe(occupations => {
      this.occupations = occupations;
      this.sortComps();
      console.log('occupations got');
    });
  }

  sortFunc(a,b): number {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }
  
  sortComps(): void {
    this.occupations.sort(this.sortFunc);
  }
  
  ngOnInit(): void {
    // commented for upgrade 13mar2021
    /*
    var user = firebase.auth().currentUser;
    if (user != null) {
      this.email = user.email;
    }
    this.editedOccupation = {_id:'',name:''};
    this.selectedOccupation = {_id:'',name:''};
    this.getOccupations();
    */
  }
  
  filter(name): boolean {
    if(this.filterStr == '') {
      return true;   
    }
    else {
      name = name.toLowerCase();
      this.filterStr = this.filterStr.toLowerCase();
      var pattStr = "^.*" + this.filterStr + ".*$";
      var pattern = new RegExp(pattStr);
      //var pattern2 = new RegExp('//')
      console.log("occupation name: " + name);
      console.log("pattStr: " + pattStr);
      console.log(pattern.test(name));
      return pattern.test(name);
    }
  }
  
  addOccupation(name: string): void {
    name = name.trim();
    if(!name) { return; }
    this.occupationService.addOccupation( {name} as Occupation)
      .subscribe(occupation => {
        this.occupations.push(occupation);
      });
  }
  
  onSelect(occupation: Occupation): void {
    this.selectedOccupation = occupation;
  }
  
  onEdit(occupation: Occupation): void {
    this.editedOccupation._id = occupation._id;
    this.editedOccupation.name = occupation.name;
  }
  
  onEditSave(name: string): void {
    name = name.trim();
    if(!name) { return; }
    this.occupations.find(d => d.name == this.editedOccupation.name).name = name;
    this.editedOccupation.name = name;
    this.occupationService.editOccupation( this.editedOccupation )
      .subscribe();
  }
  
  onDelete(occupation: Occupation): void {
    this.occupations = this.occupations.filter(c => c!== occupation);
    this.occupationService.deleteOccupation(occupation)
      .subscribe();
  }
  
  //onEdit(member: Member): void {
    //this.selectedMember = member;
    //this.gotoDetail();
    //this.router.navigate(['/edit', this.selectedMember._id]);
    //gotoDetail();
  //}
  
  //gotoDetail(): void {
    //this.selectedMember = member;
    //this.router.navigate(['/detail', this.selectedMember.id]);
  //}
  
}
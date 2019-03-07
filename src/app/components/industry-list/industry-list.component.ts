import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Industry } from '../../classes/industry';
import { IndustryService } from '../../services/industry/industry.service';

import * as firebase from 'firebase/app';

@Component({
  selector: 'list',
  templateUrl: './industry-list.component.html',
  styleUrls: ['./industry-list.component.css']
})
export class IndustryListComponent {
  email = '';
  title = 'Industries';
  industries: Industry[];
  editedIndustry: Industry;
  selectedIndustry: Industry;
  filterStr = '';
  
  constructor(
    private router: Router,
    private industryService: IndustryService
  ) { }

  getIndustries(): void {
    this.industryService.getIndustries().subscribe(industries => {
      this.industries = industries;
      this.sortInds();
      console.log('industries got');
    });
  }

  sortFunc(a,b): number {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }
  
  sortInds(): void {
    this.industries.sort(this.sortFunc);
  }
  
  ngOnInit(): void {
    var user = firebase.auth().currentUser;
    if (user != null) {
      this.email = user.email;
    }
    this.editedIndustry = {_id:'',name:''};
    this.selectedIndustry = {_id:'',name:''};
    this.getIndustries();
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
      console.log("industry name: " + name);
      console.log("pattStr: " + pattStr);
      console.log(pattern.test(name));
      return pattern.test(name);
    }
  }
  
  addIndustry(name: string): void {
    name = name.trim();
    if(!name) { return; }
    this.industryService.addIndustry( {name} as Industry)
      .subscribe(industry => {
        this.industries.push(industry);
      });
  }
  
  onSelect(industry: Industry): void {
    this.selectedIndustry = industry;
  }
  
  onEdit(industry: Industry): void {
    this.editedIndustry._id = industry._id;
    this.editedIndustry.name = industry.name;
  }
  
  onEditSave(name: string): void {
    name = name.trim();
    if(!name) { return; }
    this.industries.find(d => d.name == this.editedIndustry.name).name = name;
    this.editedIndustry.name = name;
    this.industryService.editIndustry( this.editedIndustry )
      .subscribe();
  }
  
  onDelete(industry: Industry): void {
    this.industries = this.industries.filter(c => c!== industry);
    this.industryService.deleteIndustry(industry)
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
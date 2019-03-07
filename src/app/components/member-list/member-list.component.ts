import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Member } from '../../classes/member';
import { MemberService } from '../../services/member/member.service';

import * as firebase from 'firebase/app';

@Component({
  selector: 'list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent {
  email = '';
  title = 'Group Members';
  members: Member[];
  sortByLastName = false;
  selectedMember: Member;
  selectedMembers: Member[];
  filterStr = '';
  
  constructor(
    private router: Router,
    private memberService: MemberService
  ) { }

  getMembers(): void {
    console.log('in getMembers');
    this.memberService.getMembers().subscribe(members => { this.members = members; this.first(); });
  }

  sortFirst(a,b): number {
    if (a.first < b.first)
      return -1;
    if (a.first > b.first)
      return 1;
    return 0;
  }
  
  sortLast(a,b): number {
    if (a.last < b.last)
      return -1;
    if (a.last > b.last)
      return 1;
    return 0;
  }
  
  first(): void {
    this.sortByLastName = false;
    this.members.sort(this.sortFirst);
  }

  last(): void {
    this.sortByLastName = true;
    this.members.sort(this.sortLast);
  }
  
  filter(f,l): boolean {
    if(this.filterStr == '') {
      return true;   
    }
    else {
      f = f.toLowerCase();
      l = l.toLowerCase();
      this.filterStr = this.filterStr.toLowerCase();
      var pattStr = "^.*" + this.filterStr + ".*$";
      var pattern = new RegExp(pattStr);
      /*console.log("first: " + f);
      console.log("last: " + l);
      console.log("pattStr: " + pattStr);
      console.log(pattern.test(f));
      console.log(pattern.test(l));*/
      return (pattern.test(f) || pattern.test(l));
    }
  }

  ngOnInit(): void {
    var user = firebase.auth().currentUser;
    if (user != null) {
      this.email = user.email;
    }
    this.getMembers();
    //this.first();
  }

  onViewMemberDS(member: Member): void {
    this.selectedMember = member;
    //this.gotoDetail();
    //this.router.navigate(['/member', this.selectedMember._id]);
    //gotoDetail();
  }
  
  onEdit(member: Member): void {
    this.selectedMember = member;
    //this.gotoDetail();
    this.router.navigate(['/member-edit', this.selectedMember._id]);
    //gotoDetail();
  }

  onDelete(member: Member): void {
    //this.companies = this.companies.filter(c => c!== company);
    //this.companyService.deleteCompany(company)
    //  .subscribe();
  }
  
  viewSelectedMembers(): void {
  }
  
  //gotoDetail(): void {
    //this.selectedMember = member;
    //this.router.navigate(['/detail', this.selectedMember.id]);
  //}
  
  addMember(): void {
    this.router.navigate(['/add-member']);
  } 
}
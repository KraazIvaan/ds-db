import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Member } from './member';
import { MemberService } from './member.service';

@Component({
  selector: 'list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent {
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
    this.memberService.getMembers().subscribe(members => this.members = members);
  }

  ngOnInit(): void {
    this.getMembers();
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
      var pattStr = "^.*" + this.filterStr + ".*$";
      var pattern = new RegExp(pattStr);
      //var pattern2 = new RegExp('//')
      console.log("first: " + f);
      console.log("last: " + l);
      console.log("pattStr: " + pattStr);
      console.log(pattern.test(f));
      console.log(pattern.test(l));
      return (pattern.test(f) || pattern.test(l));
    }
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
    this.router.navigate(['/edit', this.selectedMember._id]);
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
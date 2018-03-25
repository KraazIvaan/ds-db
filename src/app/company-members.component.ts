import { Component, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Company } from './company';
import { CompanyService } from './company.service';

import { Member } from './member';
import { MemberService } from './member.service';

@Component({
  selector: 'company-members',
  templateUrl: './company-members.component.html',
  styleUrls: ['./company-members.component.css']
})
export class CompanyMembersComponent implements OnChanges {
  @Input() company: Company;
  title = 'Companies';
  companies: Company[];
  memsEmpComp: Member[];
  memsContComp: Member[];
  memsTarComp: Member[];
  filterStr = '';
  
  constructor(
    private router: Router,
    private companyService: CompanyService,
    private memberService: MemberService,
  ) { }


  getMemsEmpComp(): void {
    this.memberService.getMembersEmployedAtCompany(this.company._id).subscribe(members => this.memsEmpComp = members);
  }

  getMemsContComp(): void {
    this.memberService.getMembersWithContactsAtCompany(this.company._id).subscribe(members => this.memsContComp = members);
  }

  getMemsTarComp(): void {
    this.memberService.getMembersTargetingCompany(this.company._id).subscribe(members => this.memsTarComp = members);
  }

  ngOnChanges(): void {
    this.getMemsEmpComp();
    this.getMemsContComp();
    this.getMemsTarComp();
  }

/*  
  filter(name): boolean {
    if(this.filterStr == '') {
      return true;   
    }                          
    else {
      var pattStr = "^.*" + this.filterStr + ".*$";
      var pattern = new RegExp(pattStr);
      //var pattern2 = new RegExp('//')
      console.log("company name: " + name);
      console.log("pattStr: " + pattStr);
      console.log(pattern.test(name));
      return pattern.test(name);
    }
  }
  
  onSelect(company: Company): void {
    // get members employed at this compnay
    // get members with contacts at this compnay
    // get members targeting this compnay
  }
*/  
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
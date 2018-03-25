import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Member } from './member';
import { MemberService } from './member.service';

import { Company } from './company';
import { CompanyService } from './company.service';

import { Organization } from './organization';
import { OrganizationService } from './organization.service';

@Component({
  selector: 'list',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {
  title = 'Add Member';
  members: Member[];
  member: Member = new Member();
  lastEditDate;
  employmentToDay;
  employmentToMonth;
  employmentToYear;
  employmentFromDay;
  employmentFromMonth;
  employmentFromYear;
  employmentTo;
  employmentFrom;
  currentlyEmployed: boolean = true;
  employmentCompany: string;
  companies: Company[];
  organizations: Organization[];
  sortByLastName = false;
  selectedMember: Member;
  selectedMembers: Member[];
  memberOf: string[];
  contactsIn: string[];
  targets: string[];
  filterStr = '';
  
  constructor(
    private router: Router,
    private memberService: MemberService,
    private companyService: CompanyService,
    private organizationService: OrganizationService
  ) { }

  getCompanies(): void {
    this.companyService.getCompanies().subscribe(companies => {
      this.companies = companies;
      console.log('companies got');
    });
  }

  getOrganizations(): void {
    this.organizationService.getOrganizations().subscribe(organizations => {
      this.organizations = organizations;
      console.log('orgs got');
    });
  }

  ngOnInit(): void {
    this.getCompanies();
    console.log('companies got');
    this.getOrganizations();
  }

  submit(): void {
    this.lastEditDate = new Date();
    this.lastEditDate = this.lastEditDate;
    this.member.lastEditDate = this.lastEditDate.toISOString();
    
    this.employmentFrom = new Date(this.employmentFromYear, (this.employmentFromMonth-1), this.employmentFromDay);
    this.member.employmentFrom = this.employmentFrom.toISOString();
    
    if(this.currentlyEmployed){
      this.member.employmentTo = this.member.lastEditDate;
    }
    else {
      this.employmentTo = new Date(this.employmentToYear, (this.employmentToMonth-1), this.employmentToDay);
      this.member.employmentTo = this.employmentTo.toISOString();
    }

    this.member.currentlyEmployed = this.currentlyEmployed;
    this.member.employmentCompany = this.employmentCompany;
    this.member.targets = this.targets;
    this.member.companies = this.contactsIn;
    this.member.organizations = this.memberOf;
    this.memberService.addMember(this.member).subscribe();
    //console.log('submit clicked');
  }
}
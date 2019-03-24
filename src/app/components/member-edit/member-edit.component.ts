import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';


import { Member } from '../../classes/member';
import { MemberService } from '../../services/member/member.service';

import { Company } from '../../classes/company';
import { CompanyService } from '../../services/company/company.service';

import { Organization } from '../../classes/organization';
import { OrganizationService } from '../../services/organization/organization.service';

import { Industry } from '../../classes/industry';
import { IndustryService } from '../../services/industry/industry.service';

import { Occupation } from '../../classes/occupation';
import { OccupationService } from '../../services/occupation/occupation.service';

@Component({
  selector: 'list',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  members: Member[];
  member: Member = new Member();
  lastEditDate;
  joinDate;
  joinDateDay;
  joinDateMonth;
  joinDateYear;
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
  industries: Industry[];
  occupations: Occupation[];
  sortByLastName = false;
  selectedMember: Member;
  selectedMembers: Member[];
  pastEmployers: string[];
  careerStage: string="early";
  memberOfOrgs: string[];
  contactsInComps: string[];
  contactsInInds: string[];
  targetComps: string[];
  targetOccs: string[];
  targetIndustry: string;
  filterStr = '';

  num_sections = 5; // there are 5 accordion sections


  constructor(
		private route: ActivatedRoute,
    private router: Router,
    private memberService: MemberService,
    private companyService: CompanyService,
    private organizationService: OrganizationService,
    private industryService: IndustryService,
    private occupationService: OccupationService
  ) { }

  toggle(n): void {
    for(var i = 1; i<=this.num_sections; i++) {
      var section_id = "body-" + i;
      var section = document.getElementById(section_id);
      if(i.toString() == n) {
          section.style.display = "block";
      }
      else {
          section.style.display = "none";
      }
    }
	}
	
	sortFunc(a,b): number {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }
  
  sortComps(): void {
    this.companies.sort(this.sortFunc);
	}
	
	sortOrgs(): void {
    this.organizations.sort(this.sortFunc);
	}
	
	sortInds(): void {
    this.industries.sort(this.sortFunc);
	}
	
	sortOccs(): void {
    this.occupations.sort(this.sortFunc);
  }

  getCompanies(): void {
    this.companyService.getCompanies().subscribe(companies => {
			this.companies = companies;
			this.sortComps();
    });
  }

  getOrganizations(): void {
    this.organizationService.getOrganizations().subscribe(organizations => {
			this.organizations = organizations;
			this.sortOrgs();
    });
  }

  getIndustries(): void {
    this.industryService.getIndustries().subscribe(industries => {
			this.industries = industries;
			this.sortInds();
    });
  }

  getOccupations(): void {
    this.occupationService.getOccupations().subscribe(occupations => {
			this.occupations = occupations;
			this.sortOccs();
    });
  }

  ngOnInit(): void {
    this.getCompanies();
    this.getOrganizations();
    this.getIndustries();
		this.getOccupations();
		let id = this.route.snapshot.paramMap.get('id');
		this.memberService.getMember(id).subscribe(member => {
			this.member = member;

			this.joinDate = new Date(member.joinDate);
			this.joinDateYear = this.joinDate.getFullYear();
			this.joinDateMonth = this.joinDate.getMonth();
			this.joinDateDay = this.joinDate.getDate();

			this.employmentFrom = new Date(member.employmentFrom);
			this.employmentFromYear = this.employmentFrom.getFullYear();
			this.employmentFromMonth = this.employmentFrom.getMonth() + 1;
			this.employmentFromDay = this.employmentFrom.getDate();

			this.currentlyEmployed = this.member.currentlyEmployed;
			if(this.currentlyEmployed){
				this.employmentTo = this.member.lastEditDate;
			}
			else {
				this.employmentTo = new Date(member.employmentTo);
				this.employmentToYear = this.employmentTo.getFullYear();
				this.employmentToMonth = this.employmentTo.getMonth() + 1;
				this.employmentToDay = this.employmentTo.getDate();
			}

			this.employmentCompany = this.member.employmentCompany;
			this.targetOccs = this.member.targetOccs;
			this.targetComps = this.member.targetComps;
			this.targetIndustry = this.member.targetIndustry;
			this.contactsInInds = this.member.contactsInInds;
			this.contactsInComps = this.member.contactsInComps;
			this.memberOfOrgs = this.member.memberOfOrgs;
			this.pastEmployers = this.member.pastEmployers;
			this.careerStage = this.member.careerStage;
			console.log('pre-edit member: ' + member);
		});
  }

  submit(): void {
    this.lastEditDate = new Date();
    this.member.lastEditDate = this.lastEditDate.toISOString();

    this.joinDate = new Date(this.joinDateYear, (this.joinDateMonth-1), this.joinDateDay);
    this.member.joinDate = this.joinDate.toISOString();
    
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
    this.member.targetOccs = this.targetOccs;
    this.member.targetComps = this.targetComps;
    this.member.targetIndustry = this.targetIndustry;
    this.member.contactsInInds = this.contactsInInds;
    this.member.contactsInComps = this.contactsInComps;
    this.member.memberOfOrgs = this.memberOfOrgs;
    this.member.pastEmployers = this.pastEmployers;
    this.member.careerStage = this.careerStage;
    this.memberService.editMember(this.member).subscribe((data) => {
			this.router.navigate(['/members']);
		}, (error) => {
			console.log("err", error);
		});
  }
}
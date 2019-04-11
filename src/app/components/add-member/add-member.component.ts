//import { FileUploader } from 'ng2-file-upload';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

// File uploader
//const URL = 'https://rm-ds-db.firebaseapp.com/api/upload';

import * as firebase from 'firebase';
//import * as firebase from 'firebase/storage';


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
	file: File;

	num_sections = 5; // there are 5 accordion sections
	
	//public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  constructor(
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

	}
	
	onFileChange(event) {
		this.file = event.target.files[0];
	}

	uploadPhoto() {
		var storageRef = firebase.storage().ref();
		var photoRef = storageRef.child('photos/test.jpg')
		photoRef.put(this.file).then(function(snapshot) {
			console.log('Uploaded a blob or file!');
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
    this.memberService.addMember(this.member).subscribe((data) => {
			this.router.navigate(['/members']);
		}, (error) => {
			console.log("err", error);
		});
  }
}
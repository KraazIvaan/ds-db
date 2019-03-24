import 'rxjs/add/operator/switchMap';
import { Component, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Member } from '../../classes/member';
import { Company } from '../../classes/company';
import { Organization } from '../../classes/organization';
import { Industry } from '../../classes/industry';
import { Occupation } from '../../classes/occupation';

import { MemberService } from '../../services/member/member.service';
import { CompanyService } from '../../services/company/company.service';
import { OrganizationService } from '../../services/organization/organization.service';
import { IndustryService } from '../../services/industry/industry.service';
import { OccupationService } from '../../services/occupation/occupation.service';



@Component({
	selector: 'member-ds',
	templateUrl: './member-ds.component.html',
	styleUrls: ['./member-ds.component.css']
})
export class MemberDsComponent implements OnChanges {
	@Input() member: Member;
	employmentCompany: Company;

	pastEmployers: Company[];
	contactsInComps: Company[]; // was memberCompanies
	contactsInInds: Industry[];
	memberOfOrgs: Organization[]; // was memberOrganizations
	targetOccs: Occupation[];
	targetIndustry: Industry;
	targetComps: Company[]; // was memberTargets
	selectedCompany: Company;
	selectedOrganization: Organization;
	joinDate: string;
	lastEditDate: string;
	employmentFrom: string;
	employmentTo: string;
	prefComm: string;

	//members: Member[];

	constructor(
		private memberService: MemberService,
		private companyService: CompanyService,
		private organizationService: OrganizationService,
		private industryService: IndustryService,
		private occupationService: OccupationService,
		private route: ActivatedRoute,
		private location: Location
	) { }

	getMember(): void {
	}

	//getMembers(): void {
	//  this.memberService.getMembers().then(members => this.members = members);
	//}

	//getMember(id: number): void {
	//  this.memberService.getMember(id).subscribe(mem => this.member = mem);
	//}

	viewCompanyMembers(): void {
		console.log('viewCompanyMembers');
	}

	onSelectComp(company: Company): void {
		this.selectedCompany = company;
	}

	onSelectOrg(organization: Organization): void {
		this.selectedOrganization = organization;
	}

	hasPrefComm(): boolean {
		if (this.member.commPref) {
			return true;
		}
		else {
			return false;
		}
	}

	hasPastEmp(): boolean {
		if (this.member.pastEmployers) {
			return true;
		}
		else {
			return false;
		}
	}

	hasEmpComm(): boolean {
		if (this.member.employmentCompany) {
			return true;
		}
		else {
			return false;
		}
	}


	ngOnChanges(): void {
		console.log(this.member);
		this.selectedCompany = null;
		this.selectedOrganization = null;

		// BEGIN trying to fix data persistence between datasheets
		// This looks like it worked.  Keep an eye on this for unintended effects

		//ORIGINAL
		// this.employmentCompany = null;
		// this.selectedCompany = null;
		// this.selectedOrganization  = null;

		//attempt to address error
		this.employmentCompany = { _id: "0", name: "N/A" };
		this.selectedCompany = { _id: "0", name: "N/A" };
		this.selectedOrganization = { _id: "0", name: "N/A", abbreviation: "N/A" };

		//this.memberCompanies = [];
		this.contactsInComps = [];
		this.contactsInInds = [];
		//this.memberOrganizations = [];
		this.memberOfOrgs = [];
		//this.memberTargets = [];
		this.targetOccs = [];
		this.targetIndustry = { _id: "0", name: "N/A" };
		this.targetComps = [];
		this.pastEmployers = [];
		this.joinDate = "";
		this.lastEditDate = "";
		this.employmentFrom = "";
		this.employmentTo = ""
		// END trying to fix data persistence between datasheets

		//get the join date and format it for display
		let tempJD = new Date(this.member.joinDate);
		this.joinDate = tempJD.toLocaleDateString(undefined, {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		})

		//get the last edit date and format it for display
		let tempLED = new Date(this.member.lastEditDate);
		this.lastEditDate = tempLED.toLocaleDateString(undefined, {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		})

		//get the last employment from date and format it for display
		let tempEF = new Date(this.member.employmentFrom);
		this.employmentFrom = tempEF.toLocaleDateString(undefined, {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		})

		//get the last employment to date and format it for display
		if (this.member.currentlyEmployed === true) {
			this.employmentTo = "present";
		}
		else {
			let tempET = new Date(this.member.employmentTo);
			this.employmentTo = tempET.toLocaleDateString(undefined, {
				day: 'numeric',
				month: 'short',
				year: 'numeric'
			})
		}

		// if the member is employed, get the company.  Otherwise, set it to "N/A"
		/*
		if(this.member.currentlyEmployed === true) {
			this.companyService.getCompany(this.member.employmentCompany)
				.subscribe(ec => {
					this.employmentCompany = ec;
			});
		}
		
		this.companyService.getCompany(this.member.employmentCompany)
			.subscribe(ec => {
				this.employmentCompany = ec;
			});
		*/
		if (typeof this.member.employmentCompany !== "undefined") {
			this.companyService.getCompany(this.member.employmentCompany)
			.subscribe(ec => {
				this.employmentCompany = ec;
			});
		}
		else {
			this.employmentCompany = { _id: "0", name: "N/A" };
		}


		/* this else block will not be necessary if this.employmentCompany is initialized to a non-null value
		else {
			this.employmentCompany = {_id: "0", name: "N/A"};
		}
		*/

		// if the member has contacts at companies, get them.  Otherwise, set it to "None".
		if (typeof this.member.contactsInComps !== "undefined") {
			if (this.member.contactsInComps.length > 0) {
				// concatenate all companies where the member has contacts into a string to be sent to the API
				let companiesStr = this.member.contactsInComps.join('|');

				this.companyService.getCompaniesByID(companiesStr)
					.subscribe(ecs => {
						this.contactsInComps = ecs;
					});
			}
			else {
				// TODO: fill this in
				this.contactsInComps = [{ _id: "0", name: "N/A" }];
			}
		}
		else { }

		// if the member has contacts in any industries, get them.  Otherwise, set it to "None".
		if (typeof this.member.contactsInInds !== "undefined") {
			if (this.member.contactsInInds.length > 0) {
				// concatenate all industries where the member has contacts into a string to be sent to the API
				let contactsInInds = this.member.contactsInInds.join('|');

				this.industryService.getIndustriesByID(contactsInInds)
					.subscribe(ecs => {
						this.contactsInInds = ecs;
					});
			}
			else {
				// TODO: fill this in
				this.contactsInInds = [{ _id: "0", name: "N/A" }];
			}
		}
		else { }

		// if the member has target companies, get them.  Otherwise, set it to "None".
		if (typeof this.member.targetComps !== "undefined") {
			if (this.member.targetComps.length > 0) {
				// concatenate all targets the member has into a string to be sent to the API
				let targetsStr = this.member.targetComps.join('|');

				this.companyService.getCompaniesByID(targetsStr)
					.subscribe(targets => {
						this.targetComps = targets;
					});
			}
			else {
				// TODO: fill this in
				this.targetComps = [{ _id: "0", name: "N/A" }];
			}
		}
		else { }

		// if the member has target occupations, get them.  Otherwise, set it to "None".
		if (typeof this.member.targetOccs !== "undefined") {
			if (this.member.targetOccs.length > 0) {
				// concatenate all targets the member has into a string to be sent to the API
				let targetsStr = this.member.targetOccs.join('|');

				this.occupationService.getOccupationsByID(targetsStr)
					.subscribe(targets => {
						this.targetOccs = targets;
					});
			}
			else {
				// TODO: fill this in
				this.targetOccs = [{ _id: "0", name: "N/A" }];
			}
		}
		else { }

		// if the member is in any organizations, get them.  Otherwise, set it to "None".
		if (typeof this.member.memberOfOrgs !== "undefined") {
			if (this.member.memberOfOrgs.length > 0) {
				// concatenate all organizations the member is in into a string to be sent to the API
				let organizationsStr = this.member.memberOfOrgs.join('|');

				this.organizationService.getOrganizationsByID(organizationsStr)
					.subscribe(orgs => {
						this.memberOfOrgs = orgs;
					});
			}
			else {
				// TODO: fill this in
				this.memberOfOrgs = [{ _id: "0", name: "N/A", abbreviation: null }];
			}
		}
		else { }

		// if the member has a target industry, get it.  Otherwise, set it to "None".
		if (typeof this.member.targetIndustry !== "undefined") {
			this.industryService.getIndustry(this.member.targetIndustry)
				.subscribe(ind => {
					this.targetIndustry = ind;
				});
		}
		else {
			// TODO: fill this in
			this.targetIndustry = { _id: "0", name: "N/A" };
		}

		// if the member has past employers, get them.  Otherwise, set it to "None".

		if (typeof this.member.pastEmployers !== "undefined") {
			if (this.member.pastEmployers.length > 0) {
				// concatenate all targets the member has into a string to be sent to the API
				let pastEmps = this.member.pastEmployers.join('|');

				this.companyService.getCompaniesByID(pastEmps)
					.subscribe(pastEmps => {
						this.pastEmployers = pastEmps;
					});
			}
			else {
				// TODO: fill this in
				this.targetComps = [{ _id: "0", name: "N/A" }];
			}
		}
		else { }

    /* BEGIN original member processing
    this.route.params
      .switchMap((params: Params) => this.memberService.getMember(params['id']))
      .subscribe( member => {
        this.selectedCompany = null;
        this.selectedOrganization = null;
        this.member = member;
        
        //get the last edit date and format it for display
        let tempLED = new Date(this.member.lastEditDate);
        this.lastEditDate = tempLED.toLocaleDateString(undefined, {  
          day : 'numeric',
	  month : 'short',
	  year : 'numeric'
        })
        
        //get the last employment from date and format it for display
        let tempEF = new Date(this.member.employmentFrom);
        this.employmentFrom = tempEF.toLocaleDateString(undefined, {  
          day : 'numeric',
	  month : 'short',
	  year : 'numeric'
        })
        
        //get the last employment to date and format it for display
        if(member.currentlyEmployed === true) {
          this.employmentTo = "present";
        }
        else {
          let tempET = new Date(this.member.employmentTo);
          this.employmentTo = tempET.toLocaleDateString(undefined, {  
            day : 'numeric',
            month : 'short',
            year : 'numeric'
          })
        }
        
        // if the member is employed, get the company.  Otherwise, set it to "N/A"
	if(member.currentlyEmployed === true) {
          this.companyService.getCompany(member.employmentCompany)
           .subscribe(ec => {
             this.employmentCompany = ec;
           });
	}
	else {
	  this.employmentCompany = {_id: "0", name: "N/A"};
	}

        // if the member has contacts at companies, get them.  Otherwise, set it to "None".
        if(member.companies.length > 0 ) {
          // concatenate all companies where the member has contacts into a string to be sent to the API
          let companiesStr = member.companies.join('|');

          this.companyService.getCompaniesByID(companiesStr)
           .subscribe(ecs => {
             this.memberCompanies = ecs;
           });
        }
        else {
          // TODO: fill this in
          this.memberCompanies = [{_id: "0", name: "N/A"}];
        }

        // if the member has targets, get them.  Otherwise, set it to "None".
        if(member.targets.length > 0 ) {
          // concatenate all targets the member has into a string to be sent to the API
          let targetsStr = member.targets.join('|');

          this.companyService.getCompaniesByID(targetsStr)
           .subscribe(targets => {
             this.memberTargets = targets;
           });
        }
        else {
          // TODO: fill this in
          this.memberTargets = [{_id: "0", name: "N/A"}];
        }

        // if the member is in any organizations, get them.  Otherwise, set it to "None".         
        if(member.organizations.length > 0 ) {
          // concatenate all organizations the member is in into a string to be sent to the API
          let organizationsStr = member.organizations.join('|');

          this.organizationService.getOrganizationsByID(organizationsStr)
           .subscribe(orgs => {
             this.memberOrganizations = orgs;
           });
        }
        else {
          // TODO: fill this in
          this.memberOrganizations = [{_id: "0", name: "N/A", abbreviation: null}];
        }
      }); END original member processing*/
	}
}
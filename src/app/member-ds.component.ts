import 'rxjs/add/operator/switchMap';
import { Component, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Member } from './member';
import { Company } from './company';
import { Organization } from './organization';

import { MemberService } from './member.service';
import { CompanyService } from './company.service';
import { OrganizationService } from './organization.service';


@Component({
  selector: 'member-ds',
  templateUrl: './member-ds.component.html',
  styleUrls: ['./member-ds.component.css']
})
export class MemberDsComponent implements OnChanges {
  @Input() member: Member;
  employmentCompany: Company;
  memberCompanies: Company[];
  memberOrganizations: Organization[];
  memberTargets: Company[];
  selectedCompany: Company;
  selectedOrganization: Organization;
  lastEditDate: string;
  employmentFrom: string;
  employmentTo: string;
  prefComm: string;
  
  //members: Member[];

  constructor(
    private memberService: MemberService,
    private companyService: CompanyService,
    private organizationService: OrganizationService,
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
    if(this.member.prefEmail || this.member.prefText || this.member.prefPhone) {
      return true;
    }
    else {
      return false;
    }
  }
  
  getPrefComm(): string {
    let prefComm: string = "";
    
    if(this.member.prefEmail) {
      prefComm += "Email";
    }

    if(this.member.prefText) {
      if(prefComm) { prefComm += ", "}
      prefComm += "Text";
    }    

    if(this.member.prefPhone) {
      if(prefComm) { prefComm += ", "}
      prefComm += "Phone";
    }
    
    return prefComm;
  }
  
  ngOnChanges(): void {
    console.log(this.member);
        this.selectedCompany = null;
        this.selectedOrganization = null;
        
        // BEGIN trying to fix data persistence between datasheets
        // This looks like it worked.  Keep an eye on this for unintended effects
        this.employmentCompany = null;
	this.memberCompanies = [];
	this.memberOrganizations = [];
	this.memberTargets = [];
	this.selectedCompany = null;
	this.selectedOrganization  = null;
	this.lastEditDate = "";
	this.employmentFrom = "";
        this.employmentTo = ""
        this.memberTargets = [];
        // END trying to fix data persistence between datasheets
        
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
        if(this.member.currentlyEmployed === true) {
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
        
        // if the member has a preferred communication method, get it
        this.prefComm = this.getPrefComm();
        
        // if the member is employed, get the company.  Otherwise, set it to "N/A"
	if(this.member.currentlyEmployed === true) {
          this.companyService.getCompany(this.member.employmentCompany)
           .subscribe(ec => {
             this.employmentCompany = ec;
           });
	}
	else {
	  this.employmentCompany = {_id: "0", name: "N/A"};
	}

        // if the member has contacts at companies, get them.  Otherwise, set it to "None".
        if(this.member.companies.length > 0 ) {
          // concatenate all companies where the member has contacts into a string to be sent to the API
          let companiesStr = this.member.companies.join('|');

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
        if(this.member.targets.length > 0 ) {
          // concatenate all targets the member has into a string to be sent to the API
          let targetsStr = this.member.targets.join('|');

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
        if(this.member.organizations.length > 0 ) {
          // concatenate all organizations the member is in into a string to be sent to the API
          let organizationsStr = this.member.organizations.join('|');

          this.organizationService.getOrganizationsByID(organizationsStr)
           .subscribe(orgs => {
             this.memberOrganizations = orgs;
           });
        }
        else {
          // TODO: fill this in
          this.memberOrganizations = [{_id: "0", name: "N/A", abbreviation: null}];
        }

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
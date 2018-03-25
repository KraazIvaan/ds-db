import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Organization } from './organization';
import { OrganizationService } from './organization.service';

@Component({
  moduleId: module.id,
  selector: 'organizationlist',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})
export class OrganizationListComponent {
  title = 'Organizations';
  organization: Organization;
  organizations: Organization[];
  selectedOrganization: Organization;
  
  constructor(
    private router: Router,
    private organizationService: OrganizationService
  ) { }

  getOrganizations(): void {
    this.organizationService.getOrganizations().subscribe(organizations => this.organizations = organizations);
  }

  ngOnInit(): void {
    this.getOrganizations();
  }
  
  //onSelect(member: Member): void {
    //this.selectedMember = member;
    //this.router.navigate(['/detail', this.selectedMember.id]);
    //gotoDetail();
  //}
  
  //gotoDetail(): void {
    //this.router.navigate(['/detail', this.selectedMember.id]);
  //}
}
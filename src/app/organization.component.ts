import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Organization } from './organization';
import { OrganizationService } from './organization.service';

@Component({
  selector: 'list',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent {
  title = 'Organizations';
  organizations: Organization[];
  editedOrganization: Organization;
  selectedOrganization: Organization;
  filterStr = '';
  
  constructor(
    private router: Router,
    private organizationService: OrganizationService
  ) { }

  getOrganizations(): void {
    this.organizationService.getOrganizations().subscribe(organizations => {
      this.organizations = organizations;
      this.sortOrgs();
    });
  }

  ngOnInit(): void {
    this.editedOrganization = {_id:'',name:'',abbreviation:''};
    this.selectedOrganization = {_id:'',name:'',abbreviation:''};
    this.getOrganizations();
  }

  sortFunc(a,b): number {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }
  
  sortOrgs(): void {
    this.organizations.sort(this.sortFunc);
  }

  filter(name): boolean {
    if(this.filterStr == '') {
      return true;   
    }
    else {
      var pattStr = "^.*" + this.filterStr + ".*$";
      var pattern = new RegExp(pattStr);
      //var pattern2 = new RegExp('//')
      console.log("organization name: " + name);
      console.log("pattStr: " + pattStr);
      console.log(pattern.test(name));
      return pattern.test(name);
    }
  }

  addOrganization(n: string, a: string): void {
    let name = n.trim();
    let abbreviation = a.trim();
    if(!abbreviation) { abbreviation = ""; }
    if(!name) { return; }
    this.organizationService.addOrganization( {name, abbreviation} as Organization)
      .subscribe(organization => {
        this.organizations.push(organization);
      });
  }

  //onEdit(member: Member): void {
    //this.selectedMember = member;
    //this.gotoDetail();
    //this.router.navigate(['/edit', this.selectedMember._id]);
    //gotoDetail();
  //}

  onSelect(organization: Organization): void {
    this.selectedOrganization = organization;
  }

  onEdit(organization: Organization): void {
    this.editedOrganization._id = organization._id;
    this.editedOrganization.name = organization.name;
    this.editedOrganization.abbreviation = organization.abbreviation;
  }
  
  onEditSave(name: string, abbreviation: string): void {
    console.log('in onEditSave');
    name = name.trim();
    abbreviation = abbreviation.trim();
    if(!name || !abbreviation) { return; }
    let index = this.organizations.findIndex(d => d.name == this.editedOrganization.name); //.name = name;
    // this.organizations.find(d => d.name == this.editedOrganization.name).abbreviation = abbreviation;
    this.organizations[index].name = name;
    this.organizations[index].abbreviation = abbreviation;
    this.editedOrganization.name = name;
    this.editedOrganization.abbreviation = abbreviation;
    this.organizationService.editOrganization( this.editedOrganization )
      .subscribe();
  }
  
  onDelete(organization: Organization): void {
    this.organizations = this.organizations.filter(o => o!== organization);
    this.organizationService.deleteOrganization(organization)
      .subscribe();
  }

  //gotoDetail(): void {
    //this.selectedMember = member;
    //this.router.navigate(['/detail', this.selectedMember.id]);
  //}
  
}
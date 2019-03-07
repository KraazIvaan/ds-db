import { Component, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Organization } from '../../classes/organization';
import { OrganizationService } from '../../services/organization/organization.service';

import { Member } from '../../classes/member';
import { MemberService } from '../../services/member/member.service';

@Component({
  selector: 'organization-members',
  templateUrl: './organization-members.component.html',
  styleUrls: ['./organization-members.component.css']
})
export class OrganizationMembersComponent implements OnChanges {
  @Input() organization: Organization;
  title = 'Organizations';
  organizations: Organization[];
  memsInOrg: Member[];
  filterStr = '';
  
  constructor(
    private router: Router,
    private organizationService: OrganizationService,
    private memberService: MemberService,
  ) { }

  getMemsInOrganization(): void {
    this.memberService.getMembersInOrganization(this.organization._id).subscribe(members => this.memsInOrg = members);
  }

  ngOnChanges(): void {
    this.getMemsInOrganization();
  }
}
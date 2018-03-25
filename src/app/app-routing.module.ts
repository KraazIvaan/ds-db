import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddMemberComponent }  from './add-member.component';
import { DashboardComponent }   from './dashboard.component';
//import { MemberEditComponent }  from './member-edit.component';
import { MemberListComponent }  from './member-list.component';
import { MeetingListComponent }  from './meeting-list.component';
import { MemberDsComponent }    from './member-ds.component';
import { CompanyComponent }     from './company.component';
import { OrganizationComponent }     from './organization.component';

const routes: Routes = [
  { path: '', redirectTo: '/members', pathMatch: 'full' },
  { path: 'dashboard',     component: DashboardComponent },
  { path: 'member/:id',    component: MemberDsComponent },
//  { path: 'edit/:id',    component: MemberEditComponent },
  { path: 'members',       component: MemberListComponent },
  { path: 'companies',     component: CompanyComponent },
  { path: 'organizations', component: OrganizationComponent },
  { path: 'add-member',    component: AddMemberComponent },
  { path: 'meetings',      component: MeetingListComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
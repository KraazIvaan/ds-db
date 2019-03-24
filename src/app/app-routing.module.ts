import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddMemberComponent }  from './components/add-member/add-member.component';
import { BlankComponent }  from '././components/blank/blank.component';
import { CompanyListComponent }     from './components/company-list/company-list.component';
import { IndustryListComponent }     from './components/industry-list/industry-list.component';
import { LoginComponent } from "./components/login/login.component";
import { MemberEditComponent }  from './components/member-edit/member-edit.component';
import { MeetingListComponent }  from './components/meeting-list/meeting-list.component';
import { MemberListComponent }  from './components/member-list/member-list.component';
import { MemberDsComponent }    from './components/member-ds/member-ds.component';
import { OccupationListComponent }     from './components/occupation-list/occupation-list.component';
import { OrganizationListComponent }     from './components/organization-list/organization-list.component';



import { AuthGuard } from "./services/auth-guard/auth-guard.service";

//  { path: 'edit/:id',    component: MemberEditComponent },
/* original, before adding anything for auth
const routes: Routes = [
  { path: '', redirectTo: '/members', pathMatch: 'full' },
  { path: 'member/:id',    component: MemberDsComponent },
  { path: 'members',       component: MemberListComponent },
  { path: 'companies',     component: CompanyComponent },
  { path: 'organizations', component: OrganizationComponent },
  { path: 'add-member',    component: AddMemberComponent },
  { path: 'meetings',      component: MeetingListComponent}
];
*/

const routes: Routes = [
  {
    path: '',
    //component: LoginComponent
    component: BlankComponent
    //redirectTo: '/members', pathMatch: 'full'
  },
  {
    path: 'member/:id',
    canActivate: [AuthGuard],
    component: MemberDsComponent
  },
  {
    path: 'members',
    canActivate: [AuthGuard],
    component: MemberListComponent
  },
  {
    path: 'companies',
    canActivate: [AuthGuard],
    component: CompanyListComponent
  },
  {
    path: 'organizations',
    canActivate: [AuthGuard],
    component: OrganizationListComponent
  },
    {
    path: 'industries',
    canActivate: [AuthGuard],
    component: IndustryListComponent
  },
  {
    path: 'occupations',
    canActivate: [AuthGuard],
    component: OccupationListComponent
  },
  {
    path: 'add-member',
    canActivate: [AuthGuard],
    component: AddMemberComponent
  },
  {
    path: 'member-edit/:id',
    canActivate: [AuthGuard],
    component: MemberEditComponent
  },
  {
    path: 'meetings',
    canActivate: [AuthGuard],
    component: MeetingListComponent
  }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddMemberComponent }  from './add-member.component';
import { DashboardComponent }   from './dashboard.component';
import { LoginComponent } from "./login/login.component";
//import { MemberEditComponent }  from './member-edit.component';
import { MemberListComponent }  from './member-list.component';
import { MeetingListComponent }  from './meeting-list.component';
import { MemberDsComponent }    from './member-ds.component';
import { CompanyComponent }     from './company.component';
import { OrganizationComponent }     from './organization.component';

import { AuthGuard } from "./services/auth-guard.service";

//  { path: 'edit/:id',    component: MemberEditComponent },
/* original, before adding anything for auth
const routes: Routes = [
  { path: '', redirectTo: '/members', pathMatch: 'full' },
  { path: 'dashboard',     component: DashboardComponent },
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
    component: LoginComponent
    //redirectTo: '/members', pathMatch: 'full'
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent
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
    component: CompanyComponent
  },
  {
    path: 'organizations',
    canActivate: [AuthGuard],
    component: OrganizationComponent
  },
  {
    path: 'add-member',
    canActivate: [AuthGuard],
    component: AddMemberComponent
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
import { NgModule }        from '@angular/core';
import { BrowserModule }   from '@angular/platform-browser';
import { FormsModule }     from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';



import { AddMemberComponent }      from './add-member.component';
import { AppComponent }            from './app.component';
import { CompanyComponent }        from './company.component';
import { CompanyMembersComponent } from './company-members.component';
import { OrganizationComponent }   from './organization.component';
import { OrganizationMembersComponent } from './organization-members.component';
import { DashboardComponent }      from './dashboard.component';
import { MemberDsComponent }       from './member-ds.component';
import { MemberListComponent }     from './member-list.component';
import { MemberEditComponent }     from './member-edit.component';
import { MeetingListComponent }    from './meeting-list.component';
import { MeetingComponent }        from './meeting.component';

import { MemberService }           from './member.service';
import { CompanyService }          from './company.service';
import { OrganizationService }     from './organization.service';
import { MeetingService }          from './meeting.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AddMemberComponent,
    AppComponent,
    CompanyComponent,
    CompanyMembersComponent,
    OrganizationComponent,
    OrganizationMembersComponent,
    DashboardComponent,
    MemberDsComponent,
    MemberListComponent,
    MemberEditComponent,
    MeetingListComponent,
    MeetingComponent,
  ],
  providers: [ CompanyService, MemberService, OrganizationService, MeetingService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
import { NgModule }        from '@angular/core';
import { BrowserModule }   from '@angular/platform-browser';
import { FormsModule }     from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';

// BEGIN imports for auth
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth-guard/auth-guard.service';
// END imports for auth

// Components
import { AddMemberComponent }           from './components/add-member/add-member.component';
import { AppComponent }                 from './app.component';
import { CompanyListComponent }         from './components/company-list/company-list.component';
import { CompanyMembersComponent }      from './components/company-members/company-members.component';
import { IndustryListComponent }         from './components/industry-list/industry-list.component';
import { LoginComponent }               from './components/login/login.component';
import { MeetingListComponent }         from './components/meeting-list/meeting-list.component';
import { MeetingComponent }             from './components/meeting/meeting.component';
import { MemberDsComponent }            from './components/member-ds/member-ds.component';
import { MemberListComponent }          from './components/member-list/member-list.component';
import { MemberEditComponent }          from './components/member-edit/member-edit.component';
import { NavBarComponent }              from './components/nav-bar/nav-bar.component';
import { OccupationListComponent }      from './components/occupation-list/occupation-list.component';
import { OrganizationListComponent }    from './components/organization-list/organization-list.component';
import { OrganizationMembersComponent } from './components/organization-members/organization-members.component';

// Services
import { CompanyService }      from './services/company/company.service';
import { IndustryService }     from './services/industry/industry.service';
import { MeetingService }      from './services/meeting/meeting.service';
import { MemberService }       from './services/member/member.service';
import { OccupationService }   from './services/occupation/occupation.service';
import { OrganizationService } from './services/organization/organization.service';




@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    //AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  declarations: [
    AddMemberComponent,
    AppComponent,
    CompanyListComponent,
    CompanyMembersComponent,
    IndustryListComponent,
    OccupationListComponent,
    OrganizationListComponent,
    OrganizationMembersComponent,
    MemberDsComponent,
    MemberListComponent,
    MemberEditComponent,
    MeetingListComponent,
    MeetingComponent,
    LoginComponent,
    NavBarComponent,
  ],
  providers: [ CompanyService, IndustryService, MemberService, OccupationService, OrganizationService, MeetingService, AuthService, AuthGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
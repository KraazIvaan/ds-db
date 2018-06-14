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
import { AuthService } from './services/auth.service';
import { AuthGuard } from 'app/services/auth-guard.service';
// END imports for auth

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
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule
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
    LoginComponent,
    NavBarComponent,
  ],
  providers: [ CompanyService, MemberService, OrganizationService, MeetingService, AuthService, AuthGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
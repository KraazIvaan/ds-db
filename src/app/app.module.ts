import { NgModule }        from '@angular/core';
import { BrowserModule }   from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// BEGIN imports for auth
import { environment } from '../environments/environment';
//import { AngularFireModule } from 'angularfire2'; // commented for upgrade 13mar2021
//import { AngularFireDatabaseModule } from 'angularfire2/database'; // commented for upgrade 13mar2021
//import { AngularFireAuthModule } from 'angularfire2/auth'; // commented for upgrade 13mar2021
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth-guard/auth-guard.service';
// END imports for auth

// import for file upload
//import { FileUploadModule } from 'ng2-file-upload';
import { FileSelectDirective } from 'ng2-file-upload';

// Components
import { AddMeetingComponent }           from './components/add-meeting/add-meeting.component';
import { AddMemberComponent }           from './components/add-member/add-member.component';
import { AdminComponent }               from './components/admin/admin.component';
import { AppComponent }                 from './app.component';
import { BlankComponent }               from './components/blank/blank.component';
import { CompanyListComponent }         from './components/company-list/company-list.component';
import { CompanyMembersComponent }      from './components/company-members/company-members.component';
import { HeaderComponent }              from './components/header/header.component';
import { IndustryListComponent }        from './components/industry-list/industry-list.component';
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
import { PasswordResetComponent }       from './components/password-reset/password-reset.component';
import { PhotoUploadComponent }         from './components/photo-upload/photo-upload.component';

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
		ReactiveFormsModule,
    AppRoutingModule,
    //AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    //AngularFireModule.initializeApp(environment.firebase), // commented for upgrade 13mar2021
    //AngularFireDatabaseModule, // commented for upgrade 13mar2021
		//AngularFireAuthModule, // commented for upgrade 13mar2021
		//FileUploadModule
  ],
  declarations: [
		AddMeetingComponent,
    AddMemberComponent,
    AdminComponent,
		AppComponent,
    BlankComponent,
    CompanyListComponent,
		CompanyMembersComponent,
		FileSelectDirective,
    HeaderComponent,
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
    PasswordResetComponent,
    PhotoUploadComponent,
  ],
  providers: [
    CompanyService,
    IndustryService,
    MemberService,
    OccupationService,
    OrganizationService,
    MeetingService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../services/auth/auth.service';
import { MemberService } from '../../services/member/member.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
	index = -1;
	email = '';
	first = '';
	last = '';

	constructor(
		public authService: AuthService,
		public memberService: MemberService
	) { }

  ngOnInit() {
		/* this works. seeing if another approach does also.  go back to this if it doesn't.
    var user = firebase.auth().currentUser;
    //var name, email, photoUrl, uid, emailVerified;
    
    if (user != null) {
      this.email = user.email;
      //email = user.email;
      //photoUrl = user.photoURL;
      //emailVerified = user.emailVerified;
      //uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
		}
		*/
		var email = this.authService.getCurrUserEmail();
		if(email != false) {
			this.email = email;
			this.memberService.getMemberFromEmail(email).subscribe(member => {
				console.log('member ID: ' + member._id);
				this.first = member.first;
				this.last = member.last;
			})
		}
	}
	
	select(id: number) {
		this.index = id;
	}

  logout() {
    this.authService.logout();
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

import * as firebase from 'firebase/app';

@Component({
  selector: 'password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

	message = "";
	email = "";

	constructor(private authService: AuthService, private router: Router) { }
	
	sendPasswordResetEmail() {
		var auth = firebase.auth();
		auth.sendPasswordResetEmail(this.email).then(() => {
			this.message = "Reset link sent.  Please check your email.";
			console.log('email sent');
		}).catch((error) => {
			switch(error.code) {
				case 'auth/invalid-email':
					this.message = "Invalid email address";
				break;
				case 'auth/user-not-found':
					this.message = "User not found";
				break;
				default:
					console.log('error code: ' + error.code);
				break;
			}
		});
	}

  ngOnInit() { }

}

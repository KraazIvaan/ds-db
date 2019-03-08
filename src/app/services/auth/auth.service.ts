import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
	private user: Observable<firebase.User>;
	private userDetails: firebase.User = null;

	constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
		this.user = _firebaseAuth.authState;

		this.user.subscribe(
			(user) => {
				if (user) {
					this.userDetails = user;
					console.log(this.userDetails);
				}
				else {
					this.userDetails = null;
				}
			}
		)
	}

	signInRegular(email, password) {
		const credential = firebase.auth.EmailAuthProvider.credential(email, password);
		return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
	}

	isLoggedIn() {
		if (this.userDetails == null) {
			console.log('ILI called, returning false');
			return false;
		} else {
			console.log('ILI called, returning true');
			console.log('email:' + this.userDetails.email);
			return true;
		}
	}

	logout() {
		this._firebaseAuth.auth.signOut()
			.then((res) => {
				console.log('res:' + res);
				this.userDetails = null;
				/*this.router.navigate(['/'])*/
		});
	}

}
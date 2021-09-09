import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

/* commented for upgrade 13mar2021
//import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase/app';
*/
// new syntax according to https://github.com/angular/angularfire/blob/master/docs/auth/getting-started.md
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';

@Injectable({ providedIn: 'root' })
export class AuthService {
	//private user: firebase.User;// commented for upgrade 13mar2021
	private user: Observable<firebase.User>;
	private userDetails: firebase.User = null;// commented for upgrade 13mar2021
	private errorMsg: string;

	// commented for upgrade 13mar2021

	constructor(private auth: AngularFireAuth, private router: Router) {
		this.user = auth.user;
		/* commented out, since it's from the old version 14Mar2021
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
		*/
		//this.user = auth.user;
	}

	signInRegular(email, password) {
		//const credential = firebase.auth.EmailAuthProvider.credential(email, password);// commented for upgrade 13mar2021
		return this.auth.signInWithEmailAndPassword(email, password)// commented for upgrade 13mar2021
		/*
		this.auth.signInWithEmailAndPassword(email, password)
		.then(function(userCredential){
			this.userDetails = userCredential.user;
			return this.user;
		})
		.catch(function(error){
			//var errorCode = error.code;
			this.errorMsg = error.message;
			alert(this.errorMsg);
		})
		*/
	}

	isLoggedIn() {
		// commented for upgrade 13mar2021
		/*
		if (this.userDetails == null) {
			//console.log('ILI called, returning false');
			return false;
		} else {
			//console.log('ILI called, returning true');
			//console.log('email:' + this.userDetails.email);
			return true;
		}*/
		if (this.auth.user === null) {
			//console.log('ILI called, returning false');
			return false;
		} else {
			//console.log('ILI called, returning true');
			//console.log('email:' + this.userDetails.email);
			return true;
		}
	}

	getCurrUserEmail() {
		// commented for upgrade 13mar2021
		if (this.auth.user === null) {
			return false;
		} else {
			return this.auth.user.
		}
	}

	logout() {
		// commented for upgrade 13mar2021
		/*
		this._firebaseAuth.auth.signOut()
			.then((res) => {
				console.log('res:' + res);
				this.userDetails = null;
				//this.router.navigate(['/'])
		});*/
		this.auth.signOut()
		.then((res) => {
			console.log('res:' + res);
			this.userDetails = null;
			//this.router.navigate(['/']);
	});
	}

}
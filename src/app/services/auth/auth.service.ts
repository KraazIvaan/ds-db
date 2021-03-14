import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

//import { AngularFireAuth } from 'angularfire2/auth';// commented for upgrade 13mar2021
//import * as firebase from 'firebase/app';// commented for upgrade 13mar2021
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
	//private user: Observable<firebase.User>;// commented for upgrade 13mar2021
	//private userDetails: firebase.User = null;// commented for upgrade 13mar2021

	// commented for upgrade 13mar2021
	/*
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
*/
	signInRegular(email, password) {
		//const credential = firebase.auth.EmailAuthProvider.credential(email, password);// commented for upgrade 13mar2021
		//return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)// commented for upgrade 13mar2021
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
		return false; // temporary value for upgrade 13mar2021
	}

	getCurrUserEmail() {
		// commented for upgrade 13mar2021
		/*
		if (this.userDetails == null) {
			return false;
		} else {
			return this.userDetails.email;
		}*/
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
	}

}
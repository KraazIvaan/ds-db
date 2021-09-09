import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
	};
	message = "";

  constructor(private authService: AuthService, private router: Router) { }

  signInWithEmail() {
		// commented out for upgrade 13mar2021
    this.authService.signInRegular(this.user.email, this.user.password)
    .then((res) => {
       //console.log(res);
       this.router.navigate(['members']);
    })
    .catch((err) => {
			switch(err.code) {
				case 'auth/invalid-email':
					this.message = "Invalid email address";
				break;
				case 'auth/user-not-found':
					this.message = "User not found";
				break;
				case 'auth/wrong-password':
					this.message = "Wrong password";
				break;
				default:
					console.log('error code: ' + err);
				break;
			}
		});
  }

  ngOnInit() { }

}

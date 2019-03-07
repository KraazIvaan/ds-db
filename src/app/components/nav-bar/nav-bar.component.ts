import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  email = '';

  constructor() { }

  ngOnInit() {
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
  }

}

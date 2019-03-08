import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  isLoggedIn: boolean;

  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

  ngOnInit() { 
    //this.getLoginStatus();
  }

  ngDoCheck() { 
    this.getLoginStatus();
  }

  getLoginStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

}

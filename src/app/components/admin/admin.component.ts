import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Member } from '../../classes/member';
import { MemberService } from '../../services/member/member.service';

import * as firebase from 'firebase/app';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	email = '';
	selectedMember: Member;

  constructor(
		private router: Router,
		private memberService: MemberService
	) { }

  ngOnInit() {
    var user = firebase.auth().currentUser;
    
    if (user != null) {
			this.email = user.email;
			console.log('this.email: ', this.email);
			this.memberService.getMembers().subscribe((members) => {
				this.selectedMember = members.find((element) => {
					return element.email1 == this.email;
				})
			});
    }
	}
	
	onEdit(): void {
    this.router.navigate(['/member-edit', this.selectedMember._id]);
	}
	
	onUpload(): void {
    this.router.navigate(['/photo-upload', this.selectedMember._id]);
  }

}

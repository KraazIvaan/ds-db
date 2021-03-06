import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Member } from '../../classes/member';
import { MemberService } from '../../services/member/member.service';

//import * as firebase from 'firebase';// commented for upgrade 13mar2021

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {
	file: File;
	id: string;
	message = "";

  constructor(
		private route: ActivatedRoute,
    private router: Router
	) { }

  ngOnInit() {
		this.id = this.route.snapshot.paramMap.get('id');
  }

	onFileChange(event) {
		this.file = event.target.files[0];
	}

	onSubmit() {
		// commented for upgrade 13mar2021
		/*
		var storageRef = firebase.storage().ref();
		var filename = 'photos/' + this.id + '.jpg';
		var photoRef = storageRef.child(filename)
		photoRef.put(this.file).then((snapshot) => {
			//console.log('Photo uploaded');
			this.message = "Photo uploaded.";
		});*/
	}
}

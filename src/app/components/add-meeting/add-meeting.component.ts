//import { FileUploader } from 'ng2-file-upload';

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';

import { Meeting } from '../../classes/meeting';
import { MeetingService } from '../../services/meeting/meeting.service';



// File uploader
//const URL = 'https://rm-ds-db.firebaseapp.com/api/upload';

import * as firebase from 'firebase';
//import * as firebase from 'firebase/storage';


@Component({
  selector: 'list',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})
export class AddMeetingComponent implements OnInit {
  title = 'Add Meeting';
  meeting: Meeting = new Meeting();
  meetingDate;
  meetingDateDay;
  meetingDateMonth;
	meetingDateYear;
	meetingTopic;

	meetingForm = this.formBuilder.group({
		day: [''],
		month: [''],
		year: [''],
		topic: [''],
		questions: this.formBuilder.array([
			this.formBuilder.control('')
		])
	});
	
	get questions() {
		return this.meetingForm.get('questions') as FormArray;
	}

	addQuestion() {
		this.questions.push(this.formBuilder.control(''));
	}

	removeQuestion(index) {
		this.questions.removeAt(index);
	}

	num_sections = 5; // there are 5 accordion sections
	
	//public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  constructor(
		private formBuilder: FormBuilder,
    private router: Router,
    private meetingService: MeetingService
	) { }
	
  toggle(n): void {
    for(var i = 1; i<=this.num_sections; i++) {
      var section_id = "body-" + i;
      var section = document.getElementById(section_id);
      if(i.toString() == n) {
          section.style.display = "block";
      }
      else {
          section.style.display = "none";
      }
    }
	}
	
	sortFunc(a,b): number {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }
  
  ngOnInit(): void {
  }

  submit(): void {
		// subtract 1 from the entered month, since Javascript months go from 0 to 11
		//var dateNum = parseInt(this.meetingDateMonth,10);
		//console.log('meetingForm:' + this.meetingForm.value);

		var dateNum = parseInt(this.meetingForm.value.month,10);
		dateNum--;
		/*
		console.log('day: ' + this.meetingForm.value.day);
		console.log('month: ' + dateNum);
		console.log('year: ' + this.meetingForm.value.year);
		*/

		this.meetingDate = new Date(this.meetingForm.value.year, dateNum, this.meetingForm.value.day);

		this.meeting.date = this.meetingDate.toISOString();
		this.meeting.topic = this.meetingForm.value.topic;
		this.meeting.members = [];
		this.meeting.questions = this.meetingForm.value.questions;

		//console.log('meeting:' + JSON.stringify(this.meeting));

		this.meetingService.addMeeting(this.meeting).subscribe((data) => {
			this.router.navigate(['/members']);
		}, (error) => {
			console.log("err", error);
		});

  }
}
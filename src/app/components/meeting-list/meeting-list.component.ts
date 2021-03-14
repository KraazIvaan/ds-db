import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Meeting } from '../../classes/meeting';
import { Member } from '../../classes/member';

import { AuthService } from '../../services/auth/auth.service';
import { MeetingService } from '../../services/meeting/meeting.service';
import { MemberService } from '../../services/member/member.service';


@Component({
  selector: 'meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit {
  title = 'Group Meetings';
  meetings: Meeting[];
  currMeetings: Meeting[];
  nextMeetings: Meeting[];
  selectedMeeting: Meeting;
  currMonth: string;
  nextMonth: string;
  currDate: Date = new Date();
	nextDate: Date = new Date();
	member_id: string;
	tempVar: string;

  constructor(
		private fb: FormBuilder,
		private router: Router,
		public authService: AuthService,
		private meetingService: MeetingService,
		public memberService: MemberService
	) { }

	memberAttendanceFormGroup = this.fb.group({
		memberAttendanceForm: this.fb.array([])
	})

	get memberAttendanceForm() {
		return this.memberAttendanceFormGroup.get('memberAttendanceForm') as FormArray;
	}
 
	getCurrentUser(): void {
    // commented out for upgrade 13mar2021
    /*
		var email = this.authService.getCurrUserEmail();
		if(email != false) {
			this.memberService.getMemberFromEmail(email).subscribe(member => {
				console.log('member ID: ' + member._id);
				this.member_id = member._id;
			})
		}
    */
	}

	initializeAttendanceForm(): void {
		for(var i=0; i<this.nextMeetings.length; i++) {
			this.memberAttendanceForm.push(this.fb.control(''));
		}
	}
  
  getMeetings(): void {
    this.meetingService.getMeetings().subscribe( meetings => {

			this.meetings = meetings;
			
      //this.meetings.forEach(function(item, index){
        
      //})
    });
	}
	
  // this function takes a year and month, and gets the meetings for that month and next
  getMeetingsCurrNext(year: number, month:number): void {

		// this helper function takes two meeting objects, and sorts them by date
		function dateSortFunc(meeting1, meeting2) {
			var date1 = new Date(meeting1.date).getDate();
			var date2 = new Date(meeting2.date).getDate();
			return date1 > date2 ? 1 : -1;
		}

		// increment month by 1 to go from javaScript month (0-11) to ISO month (1-12)
		month++;

    let yStr = year.toString();
    let mStr = month.toString();
    this.meetingService.getMeetingsYM(yStr, mStr).subscribe( meetings => {
      // set the dayOfMonth field for each meeting returned
      for(let m of meetings) {
        let d = new Date(m.date);
        m.dayOfMonth = d.getDate().toString();
			}

			// sort the meetings in the current month by date
			meetings.sort(dateSortFunc);
      this.currMeetings = meetings;
    });
    
    // if the current month is not December, increment the month.  If the month is December,
    // increment the year and set the month to January
    if(month != 12) {
      month++;
    }
    else {
      year++;
      month = 1;
    }
    
    yStr = year.toString();
    mStr = month.toString();
    this.meetingService.getMeetingsYM(yStr, mStr).subscribe( meetings => {
      // set the dayOfMonth field for each meeting returned
      for(let m of meetings) {
let d = new Date(m.date);
        m.dayOfMonth = d.getDate().toString();
			}

			// sort the meetings in the next month by date
			meetings.sort(dateSortFunc);
			this.nextMeetings = meetings;
			console.log('number of meetings next month ' + this.nextMeetings.length);

			// initialize the form for the member's attendance for next month
			this.initializeAttendanceForm();
    });
  }

  ngOnInit(): void {
		// get the current user
		this.getCurrentUser();
		
    let currDateNum: number;
    let nextDateNum: number;
		let currYear: number;
		
		// get the current month and year
		currYear = this.currDate.getFullYear();
		currDateNum = this.currDate.getMonth();
    
    // get next month
    if( currDateNum != 11) {
      nextDateNum = currDateNum + 1;
    }
    else {
      nextDateNum = 0
		}
    this.nextDate.setMonth(nextDateNum);
    
    // get the names of the current and next month
    this.currMonth = this.currDate.toLocaleString("en-us", {month: "long"});
    this.nextMonth = this.nextDate.toLocaleString("en-us", {month: "long"});
    
    // get the meetings for the current month and the next month
		this.getMeetingsCurrNext(currYear, currDateNum);
    
    //this.selectedMeeting = new Meeting();
    //this.getMeetings();

  }

/*  
  filter(f,l): boolean {
    if(this.filterStr == '') {
      return true;   
    }
    else {
      var pattStr = "^.*" + this.filterStr + ".*$";
      var pattern = new RegExp(pattStr);
      //var pattern2 = new RegExp('//')
      console.log("first: " + f);
      console.log("last: " + l);
      console.log("pattStr: " + pattStr);
      console.log(pattern.test(f));
      console.log(pattern.test(l));
      return (pattern.test(f) || pattern.test(l));
    }
  }
*/  
  onEdit(meeting: Meeting): void {
    this.selectedMeeting = meeting;
    //this.gotoDetail();
    this.router.navigate(['/edit', this.selectedMeeting._id]);
    //gotoDetail();
  }

  onDelete(meeting: Meeting): void {
    //this.companies = this.companies.filter(c => c!== company);
    //this.companyService.deleteCompany(company)
    //  .subscribe();
  }
  
  onViewMeeting(meeting: Meeting): void {
  }
  
  viewSelectedMeetings(): void {
  }
  
  //gotoDetail(): void {
    //this.selectedMeeting = meeting;
    //this.router.navigate(['/detail', this.selectedMeeting.id]);
  //}

  onSelect(meeting: Meeting): void {
    console.log('meeting selected.');
    this.selectedMeeting = meeting;
  }
  
  addMeeting(): void {
    this.router.navigate(['/add-meeting']);
	}
	
	onSubmit(): void {
		var rawVal = this.memberAttendanceForm.getRawValue();
		console.log(JSON.stringify(rawVal));
		console.log(JSON.stringify(this.nextMeetings))
		// for each meeting in memberAttendanceForm
		for(var i=0; i<this.memberAttendanceForm.length; i++) {
      var body = {
        "member_id": this.member_id,
        "meeting_id": this.nextMeetings[i]["_id"],
        "attending": rawVal[i]
      };
      console.log(`meeting ${i}`);
      console.log(`body.member_id: ${body.member_id}`);
      console.log(`body.meeting_id: ${body.meeting_id}`);
      console.log(`body.attending: ${body.attending}`);
      
			// get the location of the member in the list of attendees, if it exists
			var memIndex = this.nextMeetings[i]["members"].indexOf(this.member_id);
			console.log('memIndex: ' + memIndex);

			console.log('this.memberAttendanceForm[i]: ' + this.memberAttendanceForm[i]);
			console.log('rawVal[i]: ' + rawVal[i]);
			console.log('this.nextMeetings[i]): ' + this.nextMeetings[i]);
      console.log('this.nextMeetings[i]["members"]: ' + this.nextMeetings[i]["members"]);
      console.log('this.nextMeetings[i]["_id"]: ' + this.nextMeetings[i]["_id"]);


			// if the member has chosen to attend the meeting:
			if(rawVal[i] == 'yes') {
				console.log('1');
				// if the member is not currently in the list of attendees for that meeting:
				if(this.nextMeetings[i]["members"].indexOf(this.member_id) < 0) {
					console.log('2');
					// add the member to the list of attendees
          //this.nextMeetings[i]["members"].push(this.member_id);
          this.meetingService.updateMeetingMems(body).subscribe((data) => {
            //this.router.navigate(['/members']);
          }, (error) => {
            console.log("err", error);
          });
				}
			}

			// if the member has chosen to not attend the meeting:
			else {
				// if the member is currently in the list of attendees for that meeting:
				if(memIndex > -1) {
					// remove the member from the list of attendees
					this.nextMeetings[i]["members"].splice(memIndex,1);
				}
			}

			// if the list of members at the meeting has been changed, update it

			console.log('meeting ' + i + ' members: ' + JSON.stringify(this.nextMeetings[i]["members"]));
		}

	}

}

/*
---------------------------------------------------------------------------------------

export class MeetingListComponent {
  title = 'Group Meetings';
  meetings: Meeting[];
  selectedMeeting: Meeting;
  selectedMeetings: Meeting[];
  filterStr = '';
  
  constructor(
    private router: Router,
    private meetingService: MeetingService
  ) { }

  getMeetings(): void {
    this.meetingService.getMeetings().subscribe(meetings => this.meetings = meetings);
  }

  ngOnInit(): void {
    this.getMeetings();
  }
  
  filter(f,l): boolean {
    if(this.filterStr == '') {
      return true;   
    }
    else {
      var pattStr = "^.*" + this.filterStr + ".*$";
      var pattern = new RegExp(pattStr);
      //var pattern2 = new RegExp('//')
      console.log("first: " + f);
      console.log("last: " + l);
      console.log("pattStr: " + pattStr);
      console.log(pattern.test(f));
      console.log(pattern.test(l));
      return (pattern.test(f) || pattern.test(l));
    }
  }
  
  onEdit(meeting: Meeting): void {
    this.selectedMeeting = meeting;
    //this.gotoDetail();
    this.router.navigate(['/edit', this.selectedMeeting._id]);
    //gotoDetail();
  }

  onDelete(meeting: Meeting): void {
    //this.companies = this.companies.filter(c => c!== company);
    //this.companyService.deleteCompany(company)
    //  .subscribe();
  }
  
  viewSelectedMeetings(): void {
  }
  
  //gotoDetail(): void {
    //this.selectedMeeting = meeting;
    //this.router.navigate(['/detail', this.selectedMeeting.id]);
  //}
  
  addMeeting(): void {
    this.router.navigate(['/add-meeting']);
  }


}
*/
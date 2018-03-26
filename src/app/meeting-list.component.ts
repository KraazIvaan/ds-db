import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Member } from './member';
import { MemberService } from './member.service';

import { Meeting } from './meeting';
import { MeetingService } from './meeting.service';

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
  //selectedMeetings: Meeting[];
  //filterStr = '';
  currMonth: string;
  nextMonth: string;
  currDate: Date = new Date();
  nextDate: Date = new Date();

  constructor(
    private router: Router,
    private meetingService: MeetingService
  ) { }
  
  //setDate

  getMeetings(): void {
    this.meetingService.getMeetings().subscribe( meetings => {
      this.meetings = meetings;
      //this.meetings.forEach(function(item, index){
        
      //})
    });
  }
  
  // this function takes a year and month, and gets the meetings for that month and next
  getMeetingsCurrNext(year: number, month:number): void {  
    let yStr = year.toString();
    let mStr = month.toString();
    this.meetingService.getMeetingsYM(yStr, mStr).subscribe( meetings => {
      // set the dayOfMonth field for each meeting returned
      for(let m of meetings) {
        //console.log(m);
        //m.getDate();
        let d = new Date(m.date);
        m.dayOfMonth = d.getDate().toString();
      }
      this.currMeetings = meetings;
    });
    
    // if the current month is not December, increment the month.  If the month is December,
    // increment the year and set the month to January
    if(month != 11) {
      month++;
    }
    else {
      year++;
      month = 0;
    }
    
    yStr = year.toString();
    mStr = month.toString();
    this.meetingService.getMeetingsYM(yStr, mStr).subscribe( meetings => {
      // set the dayOfMonth field for each meeting returned
      for(let m of meetings) {
        //console.log(m);
        //m.getDate();
        let d = new Date(m.date);
        m.dayOfMonth = d.getDate().toString();
      }
      this.nextMeetings = meetings;
    });
  }

  ngOnInit(): void {
    // get the current month and year
    let currDateNum: number;
    let nextDateNum: number;
    let currYear: number;

    // the current test data in the DB has the month set to 4
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
    
    // get the meetings from the current month
    this.getMeetingsCurrNext(currYear, currDateNum);
    
    // get the meetings from next month
    //this.nextMeetings = this.getMeetingsYM(currYear, nextDateNum);
    
    this.selectedMeeting = new Meeting();
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
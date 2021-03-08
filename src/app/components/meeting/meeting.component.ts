import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Member } from '../../classes/member';
import { MemberService } from '../../services/member/member.service';

import { Meeting } from '../../classes/meeting';
import { MeetingService } from '../../services/meeting/meeting.service';

@Component({
  selector: 'meeting-details',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnChanges, OnInit {
  @Input() meeting: Meeting;
  meetingDate: string;
  meetingMonth: string;
	memsAtMeet: Member[];
	selectedMember: Member;
	selectedTab: string;
	questions: string[];

  constructor(
    private memberService: MemberService,
    private meetingService: MeetingService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  getMemsAtMeet(): void {
    this.memberService.getMembersAtMeeting(this.meeting._id).subscribe(members => this.memsAtMeet = members);
  }
  
  getMeetingDate(): void {
		console.log('date as read: ' + this.meeting.date);
    let d = new Date(this.meeting.date);
    this.meetingDate = d.toLocaleDateString(undefined, {  
      day : 'numeric',
      month : 'long',
      year : 'numeric'
    })
  }

  ngOnChanges(): void {
		console.log('meeting component onChanges called');
		console.log(this.meeting);
    this.getMemsAtMeet();
		this.getMeetingDate();
		this.questions = this.meeting.questions;
    /*
    this.route.params
      .switchMap((params: Params) => this.meetingService.getMeeting(params['id']))
      .subscribe( meeting => {
        this.meeting = meeting;
        
        //get the meeting date and format it for display
        let tempDate = new Date(this.meeting.date);
        this.meetingDate = tempDate.toLocaleDateString(undefined, {  
          day : 'numeric',
	  month : 'short',
	  year : 'numeric'
        })
      });
      */
	}
	
	ngOnInit(): void {
		console.log('meeting component onInit called');
		this.memsAtMeet = [];
		this.getMemsAtMeet();
		this.getMeetingDate();
		this.selectedTab = "";
	}

	onSelectQuestions(): void {
		this.selectedTab = "questions";
		console.log('selected tab: ' + this.selectedTab);
	}

	onSelectMembers(): void {
		this.selectedTab = "members";
		console.log('selected tab: ' + this.selectedTab);
	}

	onViewMemberDS(member: Member): void {
    this.selectedMember = member;
  }
}
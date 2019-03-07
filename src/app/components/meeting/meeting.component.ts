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
export class MeetingComponent implements OnChanges {
  @Input() meeting: Meeting;
  meetingDate: string;
  meetingMonth: string;
  memsAtMeet: Member[];

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
    let d = new Date(this.meeting.date);
    this.meetingDate = d.toLocaleDateString(undefined, {  
      day : 'numeric',
      month : 'long',
      year : 'numeric'
    })
  }

  ngOnChanges(): void {
    console.log('meeting component onChanges called');
    this.getMemsAtMeet();
    this.getMeetingDate();
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
}
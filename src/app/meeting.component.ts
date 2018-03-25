import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Member } from './member';
import { MemberService } from './member.service';

import { Meeting } from './meeting';
import { MeetingService } from './meeting.service';

@Component({
  selector: 'meeting-details',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnChanges {
  @Input() meeting: Meeting;
  meetingDate: string;
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

  ngOnChanges(): void {
    console.log('meeting component onChanges called');
    this.getMemsAtMeet();
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
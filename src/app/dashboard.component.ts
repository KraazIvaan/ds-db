import { Component, OnInit } from '@angular/core';

import { Member } from './member';
import { MemberService } from './member.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  members: Member[] = [];

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.memberService.getMembers()
      .subscribe(members => this.members = members);
  }
}

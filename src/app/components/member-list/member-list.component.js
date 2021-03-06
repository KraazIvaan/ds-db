"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var member_service_1 = require('./member.service');
var MemberListComponent = (function () {
    function MemberListComponent(router, memberService) {
        this.router = router;
        this.memberService = memberService;
        this.title = 'Group Members';
    }
    MemberListComponent.prototype.getMembers = function () {
        var _this = this;
        this.memberService.getMembers().then(function (members) { return _this.members = members; });
    };
    MemberListComponent.prototype.ngOnInit = function () {
        this.getMembers();
    };
    MemberListComponent.prototype.onSelect = function (member) {
        this.selectedMember = member;
        //this.router.navigate(['/detail', this.selectedMember.id]);
        //gotoDetail();
    };
    MemberListComponent.prototype.gotoDetail = function () {
        //this.selectedMember = member;
        this.router.navigate(['/detail', this.selectedMember.id]);
    };
    MemberListComponent = __decorate([
        core_1.Component({
            selector: 'list',
            templateUrl: './member-list.component.html',
            styleUrls: ['./member-list.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, member_service_1.MemberService])
    ], MemberListComponent);
    return MemberListComponent;
}());
exports.MemberListComponent = MemberListComponent;
//# sourceMappingURL=member-list.component.js.map
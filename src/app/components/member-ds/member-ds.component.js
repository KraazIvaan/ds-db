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
require('rxjs/add/operator/switchMap');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var member_service_1 = require('./member.service');
var MemberDsComponent = (function () {
    //members: Member[];
    function MemberDsComponent(memberService, route, location) {
        this.memberService = memberService;
        this.route = route;
        this.location = location;
    }
    //getMembers(): void {
    //  this.memberService.getMembers().then(members => this.members = members);
    //}
    //getMember(id: number): void {
    //  this.memberService.getMember(id).then(mem => this.member = mem);
    //}
    MemberDsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.memberService.getMember(+params['id']); })
            .subscribe(function (member) { return _this.member = member; });
    };
    MemberDsComponent = __decorate([
        core_1.Component({
            selector: 'full',
            templateUrl: './member-ds.component.html',
            styles: ["\n    .label {\n      font-family: \"Arial\", sans-serif;\n      font-weight: bold;\n    }\n    .content {}\n    .field {\n      font-family: \"Arial\", sans-serif;\n      font-weight: normal;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [member_service_1.MemberService, router_1.ActivatedRoute, common_1.Location])
    ], MemberDsComponent);
    return MemberDsComponent;
}());
exports.MemberDsComponent = MemberDsComponent;
//# sourceMappingURL=member-ds.component.js.map
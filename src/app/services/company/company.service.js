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
var mock_companies_1 = require('./mock-companies');
var CompanyService = (function () {
    function CompanyService() {
    }
    CompanyService.prototype.getCompanies = function () {
        return Promise.resolve(mock_companies_1.COMPS);
    };
    CompanyService.prototype.getCompany = function (id) {
        return this.getCompanies()
            .then(function (companies) { return companies.find(function (company) { return company.id === id; }); });
    };
    CompanyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], CompanyService);
    return CompanyService;
}());
exports.CompanyService = CompanyService;
//# sourceMappingURL=company.service.js.map
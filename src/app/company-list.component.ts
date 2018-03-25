import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Company } from './company';
import { CompanyService } from './company.service';

@Component({
  selector: 'companylist',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent {
  title = 'Companies';
  companies: Company[];
  selectedCompany: Company;
  
  constructor(
    private router: Router,
    private companyService: CompanyService
  ) { }

  getCompanies(): void {
    this.companyService.getCompanies().subscribe(companies => this.companies = companies);
  }

  ngOnInit(): void {
    this.getCompanies();
  }
  
  //onSelect(member: Member): void {
    //this.selectedMember = member;
    //this.router.navigate(['/detail', this.selectedMember._id]);
    //gotoDetail();
  //}
  
  //gotoDetail(): void {
    //this.router.navigate(['/detail', this.selectedMember._id]);
  //}
}
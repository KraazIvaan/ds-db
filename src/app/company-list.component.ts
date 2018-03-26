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
    this.companyService.getCompanies().subscribe(companies => {
      this.companies = companies;
      this.sortComps();
    });
  }

  ngOnInit(): void {
    this.getCompanies();
  }

  sortFunc(a,b): number {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }
  
  sortComps(): void {
    this.companies.sort(this.sortFunc);
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
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Company } from './company';
import { CompanyService } from './company.service';

@Component({
  selector: 'list',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {
  title = 'Companies';
  companies: Company[];
  editedCompany: Company;
  selectedCompany: Company;
  filterStr = '';
  
  constructor(
    private router: Router,
    private companyService: CompanyService
  ) { }

  getCompanies(): void {
    this.companyService.getCompanies().subscribe(companies => {
      this.companies = companies;
      console.log('companies got');
    });
  }

  ngOnInit(): void {
    this.editedCompany = {_id:'',name:''};
    this.selectedCompany = {_id:'',name:''};
    this.getCompanies();
  }
  
  filter(name): boolean {
    if(this.filterStr == '') {
      return true;   
    }
    else {
      var pattStr = "^.*" + this.filterStr + ".*$";
      var pattern = new RegExp(pattStr);
      //var pattern2 = new RegExp('//')
      console.log("company name: " + name);
      console.log("pattStr: " + pattStr);
      console.log(pattern.test(name));
      return pattern.test(name);
    }
  }
  
  addCompany(name: string): void {
    name = name.trim();
    if(!name) { return; }
    this.companyService.addCompany( {name} as Company)
      .subscribe(company => {
        this.companies.push(company);
      });
  }
  
  onSelect(company: Company): void {
    this.selectedCompany = company;
  }
  
  onEdit(company: Company): void {
    this.editedCompany._id = company._id;
    this.editedCompany.name = company.name;
  }
  
  onEditSave(name: string): void {
    name = name.trim();
    if(!name) { return; }
    this.companies.find(d => d.name == this.editedCompany.name).name = name;
    this.editedCompany.name = name;
    this.companyService.editCompany( this.editedCompany )
      .subscribe();
  }
  
  onDelete(company: Company): void {
    this.companies = this.companies.filter(c => c!== company);
    this.companyService.deleteCompany(company)
      .subscribe();
  }
  
  //onEdit(member: Member): void {
    //this.selectedMember = member;
    //this.gotoDetail();
    //this.router.navigate(['/edit', this.selectedMember._id]);
    //gotoDetail();
  //}
  
  //gotoDetail(): void {
    //this.selectedMember = member;
    //this.router.navigate(['/detail', this.selectedMember.id]);
  //}
  
}
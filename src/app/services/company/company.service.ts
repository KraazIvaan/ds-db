import { Company } from '../../classes/company';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CompanyService {

  // private companiesUrl = 'http://localhost:8000/companies/';
  private companiesUrl = 'https://us-central1-rm-ds-db.cloudfunctions.net/api/companies/';
  
  // private detailUrl = 'http://localhost:8000/company/';
  private detailUrl = 'https://us-central1-rm-ds-db.cloudfunctions.net/api/company/';
  
  private addCompanyUrl = 'https://us-central1-rm-ds-db.cloudfunctions.net/api/add-company/';
  private editCompanyUrl = 'https://us-central1-rm-ds-db.cloudfunctions.net/api/edit-company/';
  private deleteCompanyUrl = 'https://us-central1-rm-ds-db.cloudfunctions.net/api/delete-company/';
  constructor(private http: HttpClient) {}

  getCompany(id: string): Observable<Company>{
    return this.http.get<Company>(this.detailUrl + id);
               //.toPromise()
               //.then(response => response.json() as Company)
               //.catch(this.handleError)
  }

  getCompanies(): Observable<Company[]>{
    return this.http.get<Company[]>(this.companiesUrl)
  }


  getCompaniesByID(ids: string): Observable<Company[]>{
    return this.http.get<Company[]>(this.companiesUrl + ids);
  }

  addCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(this.addCompanyUrl,company,httpOptions ).pipe(
      tap((company:Company) => console.log(`added company w/ id=${company._id}`)),
      catchError(this.handleError<Company>('addCompany'))
    );
  }

  editCompany (company: Company): Observable<any> {
    return this.http.put(this.editCompanyUrl + company._id, company, httpOptions).pipe(
      tap(_ => this.log(`updated company id=${company._id}`)),
      catchError(this.handleError<any>('editCompany'))
    );
  }

  deleteCompany(company: Company): Observable<Company> {
    return this.http.delete<Company>(this.deleteCompanyUrl + company._id,httpOptions ).pipe(
      //tap((company:Company) => console.log(`deleted company w/ id=${company._id}`)),
      tap((company:Company) => console.log(`deleted company`)),
      catchError(this.handleError<Company>('deleteCompany'))
    );
  }


/**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log('companyService: ' + message);
  }
}
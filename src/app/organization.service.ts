import { Organization } from './organization';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

//import 'rxjs/add/operator/toPromise';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

interface ItemsResponse {
  results: Organization;
}

@Injectable()
export class OrganizationService {

  private organizationsUrl = 'http://localhost:8000/organizations/';
  private detailUrl = 'http://localhost:8000/organization/';
  private addOrganizationUrl = 'http://localhost:8000/add-organization/';
  private editOrganizationUrl = 'http://localhost:8000/edit-organization/';
  private deleteOrganizationUrl = 'http://localhost:8000/delete-organization/';
  constructor(private http: HttpClient) {}

  getOrganizations(): Observable<Organization[]>{
    return this.http.get<Organization[]>(this.organizationsUrl);
  }

  getOrganizationsByID(ids: string): Observable<Organization[]>{
    return this.http.get<Organization[]>(this.organizationsUrl + ids);
  }
  
  getOrganization<ItemsResponse>(id: string): Observable<Organization>{
    return this.http.get<Organization>(this.detailUrl + id);
  }

  addOrganization(organization: Organization): Observable<Organization> {
    return this.http.post<Organization>(this.addOrganizationUrl,organization,httpOptions ).pipe(
      tap((organization:Organization) => console.log(`added organization w/ id=${organization._id}`)),
      catchError(this.handleError<Organization>('addOrganization'))
    );
  }

  editOrganization(organization: Organization): Observable<any> {
    console.log('in editOrganization')
    console.log('organization: ', organization);
    return this.http.put(this.editOrganizationUrl + organization._id, organization, httpOptions).pipe(
      tap(_ => this.log(`updated organization id=${organization._id}`)),
      catchError(this.handleError<any>('editOrganization'))
    );
  }

  deleteOrganization(organization: Organization): Observable<Organization> {
    return this.http.delete<Organization>(this.deleteOrganizationUrl + organization._id,httpOptions ).pipe(
      //tap((organization:Organization) => console.log(`deleted organization w/ id=${organization._id}`)),
      tap((organization:Organization) => console.log(`deleted organization`)),
      catchError(this.handleError<Organization>('deleteOrganization'))
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
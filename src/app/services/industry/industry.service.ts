import { Industry } from '../../classes/industry';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class IndustryService {

  // private industriesUrl = 'http://localhost:8000/industries/';
  private industriesUrl = 'https://us-central1-rm-ds-db.cloudfunctions.net/api/industries/';
  
  // private detailUrl = 'http://localhost:8000/industry/';
  private detailUrl = 'https://us-central1-rm-ds-db.cloudfunctions.net/api/industry/';
  
  private addIndustryUrl = 'https://us-central1-rm-ds-db.cloudfunctions.net/api/add-industry/';
  private editIndustryUrl = 'https://us-central1-rm-ds-db.cloudfunctions.net/api/edit-industry/';
  private deleteIndustryUrl = 'https://us-central1-rm-ds-db.cloudfunctions.net/api/delete-industry/';
  constructor(private http: HttpClient) {}

  getIndustry(id: string): Observable<Industry>{
    return this.http.get<Industry>(this.detailUrl + id);
               //.toPromise()
               //.then(response => response.json() as Industry)
               //.catch(this.handleError)
  }

  getIndustries(): Observable<Industry[]>{
    return this.http.get<Industry[]>(this.industriesUrl)
  }


  getIndustriesByID(ids: string): Observable<Industry[]>{
    return this.http.get<Industry[]>(this.industriesUrl + ids);
  }

  addIndustry(industry: Industry): Observable<Industry> {
    return this.http.post<Industry>(this.addIndustryUrl,industry,httpOptions ).pipe(
      tap((industry:Industry) => console.log(`added industry w/ id=${industry._id}`)),
      catchError(this.handleError<Industry>('addIndustry'))
    );
  }

  editIndustry (industry: Industry): Observable<any> {
    return this.http.put(this.editIndustryUrl + industry._id, industry, httpOptions).pipe(
      tap(_ => this.log(`updated industry id=${industry._id}`)),
      catchError(this.handleError<any>('editIndustry'))
    );
  }

  deleteIndustry(industry: Industry): Observable<Industry> {
    return this.http.delete<Industry>(this.deleteIndustryUrl + industry._id,httpOptions ).pipe(
      //tap((industry:Industry) => console.log(`deleted industry w/ id=${industry._id}`)),
      tap((industry:Industry) => console.log(`deleted industry`)),
      catchError(this.handleError<Industry>('deleteIndustry'))
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
    console.log('industryService: ' + message);
  }
}
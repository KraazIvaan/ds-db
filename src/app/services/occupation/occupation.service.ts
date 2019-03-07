import { Occupation } from '../../classes/occupation';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class OccupationService {

  // private occupationsUrl = 'http://localhost:8000/occupations/';
  private occupationsUrl = 'https://us-central1-rm-ds-db.cloudfunctions.net/api/occupations/';
  
  // private detailUrl = 'http://localhost:8000/occupation/';
  private detailUrl = 'https://us-central1-rm-ds-db.cloudfunctions.net/api/occupation/';
  
  private addOccupationUrl = 'https://us-central1-rm-ds-db.cloudfunctions.net/api/add-occupation/';
  private editOccupationUrl = 'https://us-central1-rm-ds-db.cloudfunctions.net/api/edit-occupation/';
  private deleteOccupationUrl = 'https://us-central1-rm-ds-db.cloudfunctions.net/api/delete-occupation/';
  constructor(private http: HttpClient) {}

  getOccupation(id: string): Observable<Occupation>{
    return this.http.get<Occupation>(this.detailUrl + id);
               //.toPromise()
               //.then(response => response.json() as Occupation)
               //.catch(this.handleError)
  }

  getOccupations(): Observable<Occupation[]>{
    return this.http.get<Occupation[]>(this.occupationsUrl)
  }


  getOccupationsByID(ids: string): Observable<Occupation[]>{
    return this.http.get<Occupation[]>(this.occupationsUrl + ids);
  }

  addOccupation(occupation: Occupation): Observable<Occupation> {
    return this.http.post<Occupation>(this.addOccupationUrl,occupation,httpOptions ).pipe(
      tap((occupation:Occupation) => console.log(`added occupation w/ id=${occupation._id}`)),
      catchError(this.handleError<Occupation>('addOccupation'))
    );
  }

  editOccupation (occupation: Occupation): Observable<any> {
    return this.http.put(this.editOccupationUrl + occupation._id, occupation, httpOptions).pipe(
      tap(_ => this.log(`updated occupation id=${occupation._id}`)),
      catchError(this.handleError<any>('editOccupation'))
    );
  }

  deleteOccupation(occupation: Occupation): Observable<Occupation> {
    return this.http.delete<Occupation>(this.deleteOccupationUrl + occupation._id,httpOptions ).pipe(
      //tap((occupation:Occupation) => console.log(`deleted occupation w/ id=${occupation._id}`)),
      tap((occupation:Occupation) => console.log(`deleted occupation`)),
      catchError(this.handleError<Occupation>('deleteOccupation'))
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
    console.log('occupationService: ' + message);
  }
}
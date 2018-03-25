import { Meeting } from './meeting';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Company } from './company';
import { CompanyService } from './company.service';

import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MeetingService {
  private meetingsUrl = 'http://localhost:8000/meetings/';
  private meetingsYMUrl = 'http://localhost:8000/meetings-ym/';
  private detailUrl = 'http://localhost:8000/meeting/';
  private addMeetingUrl = 'http://localhost:8000/add-meeting/';
  private editMeetingUrl = 'http://localhost:8000/edit-meeting/';
  private deleteMeetingUrl = 'http://localhost:8000/delete-meeting/';
  constructor(
    private http: HttpClient,
    private companyService: CompanyService
  ) {  }
  
  getMeetings(): Observable<Meeting[]>{
    return this.http.get<Meeting[]>(this.meetingsUrl);
  }

  getMeetingsYM(y: string, m: string): Observable<Meeting[]>{
    let queryStr = y+"/"+m;
    return this.http.get<Meeting[]>(this.meetingsYMUrl + queryStr);
  }
  
  getMeeting(id: string): Observable<Meeting>{
    return this.http.get<Meeting>(this.detailUrl + id);
  }

  addMeeting(meeting: Meeting): Observable<Meeting> {
    return this.http.post<Meeting>(this.addMeetingUrl,meeting,httpOptions ).pipe(
      tap((meeting:Meeting) => console.log(`added meeting w/ id=${meeting._id}`)),
      catchError(this.handleError<Meeting>('addMeeting'))
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
    console.log('meetingService: ' + message);
  }
}
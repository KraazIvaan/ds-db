import { Member } from './member';
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
export class MemberService {
  //private membersUrl = 'http://localhost:8000/api/members/';
  //private membersUrl = 'https://us-central1-rm-ds-db.cloudfunctions.net/api/members';
  private membersUrl = '/api/members/';
  

  private memEmpCompUrl = 'http://localhost:8000/members-company-employed/';
  private memContCompUrl = 'http://localhost:8000/members-company-contacts/';
  private memTarCompUrl = 'http://localhost:8000/members-company-targets/';
  private memInOrgUrl = 'http://localhost:8000/members-organization/';
  private memsAtMeetUrl = 'http://localhost:8000/members-meeting/';
  private detailUrl = 'http://localhost:8000/member/';
  private addMemberUrl = 'http://localhost:8000/add-member/';
  private editMemberUrl = 'http://localhost:8000/edit-member/';
  private deleteMemberUrl = 'http://localhost:8000/delete-member/';


  constructor(
    private http: HttpClient,
    private companyService: CompanyService
  ) {  }
  
  getMembers(): Observable<Member[]>{
    return this.http.get<Member[]>(this.membersUrl);
  }
  
  getMembersEmployedAtCompany(id: string): Observable<Member[]>{
    return this.http.get<Member[]>(this.memEmpCompUrl + id);
  }

  getMembersWithContactsAtCompany(id: string): Observable<Member[]>{
    return this.http.get<Member[]>(this.memContCompUrl + id);
  }

  getMembersTargetingCompany(id: string): Observable<Member[]>{
    return this.http.get<Member[]>(this.memTarCompUrl + id);
  }
  
  getMembersInOrganization(id: string): Observable<Member[]>{
    return this.http.get<Member[]>(this.memInOrgUrl + id);
  }
  
  getMembersAtMeeting(id: string): Observable<Member[]>{
    return this.http.get<Member[]>(this.memsAtMeetUrl + id);
  }

  getMember(id: string): Observable<Member>{
    return this.http.get<Member>(this.detailUrl + id);
  }

  addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.addMemberUrl,member,httpOptions ).pipe(
      tap((member:Member) => console.log(`added member w/ id=${member._id}`)),
      catchError(this.handleError<Member>('addMember'))
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
    console.log('memberService: ' + message);
  }
}

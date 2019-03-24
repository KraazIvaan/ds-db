import { Member } from '../../classes/member';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Company } from '../../classes/company';
import { CompanyService } from '../company/company.service';

import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MemberService {
  //private membersUrl = 'http://localhost:8000/api/members/';
  private membersUrl = 'https://us-central1-rm-ds-db.cloudfunctions.net/api/members';
  //private membersUrl = '/api/members/';
  //private membersUrl = '/members/';
  
  // http://localhost:8000 -> https://us-central1-rm-ds-db.cloudfunctions.net/api
  private memEmpCompUrl = 'https://us-central1-rm-ds-db.cloudfunctions.net/api/members-company-employed/';
  private memContCompUrl = 'https://us-central1-rm-ds-db.cloudfunctions.net/api/members-company-contacts/';
  private memTarCompUrl = 'https://us-central1-rm-ds-db.cloudfunctions.net/api/members-company-targets/';
  private memInOrgUrl = 'https://us-central1-rm-ds-db.cloudfunctions.net/api/members-organization/';
  private memsAtMeetUrl = 'https://us-central1-rm-ds-db.cloudfunctions.net/api/members-meeting/';
  private detailUrl = 'https://us-central1-rm-ds-db.cloudfunctions.net/api/member/';
  private addMemberUrl = 'https://us-central1-rm-ds-db.cloudfunctions.net/api/add-member/';
  private editMemberUrl = 'https://us-central1-rm-ds-db.cloudfunctions.net/api/edit-member/';
  private deleteMemberUrl = 'https://us-central1-rm-ds-db.cloudfunctions.net/api/delete-member/';


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
	
  editMember(member: Member): Observable<Member> {
    return this.http.put<Member>(this.editMemberUrl,member,httpOptions ).pipe(
      tap((member:Member) => console.log(`edited member w/ id=${member._id}`)),
      catchError(this.handleError<Member>('editMember'))
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

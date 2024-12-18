import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';
import { Photo } from '../_models/photo';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { of } from 'rxjs';
import { AccountService } from './account.service';
import { setPaginatedResponse, setPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);
  private accountService = inject(AccountService);

  baseUrl = environment.apiUrl;
  paginatedResult = signal<PaginatedResult<Member[]> | null>(null);     
  memberCache = new Map();
  user = this.accountService.currentUser();
  userParams = signal<UserParams>(new UserParams(this.user));

  resetUserParams(){
    this.userParams.set(new UserParams(this.user));
  }
  
  getMembers() {
    const response = this.memberCache.get(Object.values(this.userParams()).join('-'));

    if (response) return setPaginatedResponse(response, this.paginatedResult);

    console.log(Object.values(this.userParams()).join('-'));
    let params = setPaginationHeaders(this.userParams().pageNumber,
     this.userParams().pageSize);

    params = params.append('minAge', this.userParams().minAge);
    params = params.append('maxAge', this.userParams().maxAge);
    params = params.append('gender', this.userParams().gender);
    params = params.append('orderBy', this.userParams().orderBy);

    return this.http.get<Member[]>(this.baseUrl + 'users', {observe: 'response', params}).subscribe({
      next: response => {
       setPaginatedResponse(response, this.paginatedResult);
       this.memberCache.set(Object.values(this.userParams()).join('-'), response);
      }
    });
  }
  private setPaginatedResponse(response: HttpResponse<Member[]>) {
    this.paginatedResult.set({
      items: response.body as Member[],
      pagination: JSON.parse(response.headers.get('Pagination')!)
    })
  }

  getMember(username: string) {
    const member: Member = [...this.memberCache.values()]
    .reduce((arr, elem) => arr.concat(elem.body), [])
    .find((member: Member) => member.userName === username);
    
    if (member) return of(member);
    
    return this.http.get<Member>(this.baseUrl + 'users/' + username );
  }
  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      // tap(() => {
      //   this.members.update(members => members.map(m => 
      //     m.userName === member.userName ? member : m));
      // })
    );
  }

  setMainPhoto(photo: Photo) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photo.id, {}).pipe(
      //  tap(() => {
      //    this.members.update(members => members.map(m => {
      //     if (m.photos.includes(photo)) {
      //       m.photoUrl = photo.url;
      //     }
      //     return m;
      //    }) )
      //  })
    );
  }

  deletePhoto(photo: Photo) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photo.id).pipe(
      // tap(() => {
      //   this.members.update(members => members.map(m => {
      //     if (m.photos.includes(photo)) {
      //       m.photos = m.photos.filter(p => p.id !== photo.id);
      //     }
      //     return m;
      //    }) )
      //  })
    );
  }
}
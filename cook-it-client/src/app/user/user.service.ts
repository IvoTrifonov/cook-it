import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
const authUrl = environment.baseUrl + '/auth';

@Injectable()
export class UserService {
  accessToken = localStorage.getItem('user');

  constructor(
    private http: HttpClient,
    private toasterService: ToastrService
  ) { }

  signIn(user): Observable<any> {
    return this.http
      .post(authUrl + '/signin', user, { withCredentials: true });
  }

  signUp(user): Observable<any> {
    return this.http.post(authUrl + '/signup', user, { withCredentials: true });
  }

  signOut() {
    this.accessToken = null;
    localStorage.removeItem('user');
    this.toasterService.success('Logged out!');
  }

  checkUsernameExists(username: string): Observable<any> {
    return this.http.get(authUrl + '/signup', {
      params: new HttpParams().append('username', username)
    });
  }
}

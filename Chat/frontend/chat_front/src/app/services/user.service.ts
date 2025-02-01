import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment'; // Import your constants

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.baseUrl;
  private httpClient = inject(HttpClient);

  public getUsers(search?: string) {
    const params = search ? new HttpParams().set('search', search) : new HttpParams();
    return this.httpClient.get(this.baseUrl, { params });
  }
  public addFriend(currentUserId: number, otherUserId: number){
    const params = new HttpParams()
      .set('currentUserId', currentUserId.toString())
      .set('otherUserId', otherUserId.toString());

    return this.httpClient.post(this.baseUrl, {}, { params });
  }
}

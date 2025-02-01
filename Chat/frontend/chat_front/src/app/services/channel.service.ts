import { environment } from "../environments/environment";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

export class ChannelService{
  constructor(private http: HttpClient) { }

  getChannels(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/users/${userId}/channels`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getChannelMembers(channelId: string): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/channels/${channelId}/members`)
      .pipe(
        catchError(this.handleError)
      );
  }

  removeGuest(channelId: string, ownerId: string, guestId: string): Observable<any> {
    const params = new HttpParams().set('ownerId', ownerId).set('guestId', guestId);
    return this.http.delete<any>(`${baseUrl}/channels/${channelId}/remove-guest`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  promoteToAdmin(channelId: string, ownerId: string, guestId: string): Observable<any> {
    const params = new HttpParams().set('ownerId', ownerId).set('guestId', guestId);
    return this.http.post<any>(`${baseUrl}/channels/${channelId}/promote-to-admin`, {}, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  addGuest(channelId: string, userId: string, guestId: string): Observable<any> {
    const params = new HttpParams().set('userId', userId).set('guestId', guestId);
    return this.http.post<any>(`${baseUrl}/channels/${channelId}/add-guest`, {}, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  changeChannelName(channelId: string, ownerId: string, newName: string): Observable<string> {
    const body = { id: channelId, name: newName };
    const params = new HttpParams().set('ownerId', ownerId);
    return this.http.put<any>(`${baseUrl}/channels`, body, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  createChannel(userId: string, channelName: string): Observable<any> {
    return this.http.post<any>(`${baseUrl}/channels?userId=${userId}`, { name: channelName })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteChannel(channelId: string, userId: string): Observable<void> {
    const params = new HttpParams().set('userId', userId);
    return this.http.delete<void>(`${baseUrl}/channels/${channelId}`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  // A generic error handler
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return [];
  }
}

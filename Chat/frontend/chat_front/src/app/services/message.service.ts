import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})

export class MessageService{
  constructor(private http: HttpClient) {}

  // Get messages for a specific channel
  public getMessages(channelId: string): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/channels/${channelId}/messages`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Send a message to a specific channel
  sendMessage(messagePayload: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/messages`, messagePayload)
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

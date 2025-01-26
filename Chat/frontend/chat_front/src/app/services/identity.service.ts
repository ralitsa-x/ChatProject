import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';
import { LoginUser, RegisteredUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private baseUrl = environment.baseUrl;
  private userSubject = new BehaviorSubject<any>(this.getStoredUser());

  constructor(private http: HttpClient) {}

  login(user: LoginUser): Observable<any> {
    return new Observable((observer) => {
      this.http.post<any>(`${this.baseUrl}/login`, user).subscribe(
        (data) => {
          this.setUser(data);
          observer.next(data);
          observer.complete();
        },
        (error) => observer.error(error)
      );
    });
  }

  register(user: RegisteredUser): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/register`, user);
  }

  get user() {
    return this.userSubject.asObservable();
  }

  get isLogged(): boolean {
    return !!this.userSubject.value;
  }

  private setUser(user: any): void {
    localStorage.setItem('auth', JSON.stringify(user));
    this.userSubject.next(user);
  }

  private getStoredUser(): any {
    const storedUser = localStorage.getItem('auth');
    return storedUser ? JSON.parse(storedUser) : null;
  }
}

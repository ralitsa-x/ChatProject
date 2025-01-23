import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { UserType } from "../models/user.model";

@Injectable({
  providedIn: "root"
})

export class UserService{
  private http = inject(HttpClient)
  private baseUrl = `${environment.baseUrl}/users`

  public getChannels($user :UserType){
    return this.http.get(`${this.baseUrl}/${$user.id}/channels`);
  }
}

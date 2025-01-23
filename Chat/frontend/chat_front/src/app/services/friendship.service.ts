import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { UserType } from "../models/user.model";

@Injectable({
  providedIn: "root"
})

export class FrienshipService{
  private http = inject(HttpClient)
  private baseUrl = `${environment.baseUrl}`

  // public addFriendship($currentUserId: number, $otherUserId:number){
  //   return this.http.post(`${this.baseUrl}/add-friend?currentUserId=${$currentUserId}&otherUserId=${$otherUserId}`)
  // }
}

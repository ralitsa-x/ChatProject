import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { ChannelType } from "../models/channel.model";

@Injectable({
  providedIn: "root"
})

export class ChannelService{
  private http = inject(HttpClient)
  private baseUrl = `${environment.baseUrl}/channels`

  public createChannel($channel : ChannelType){
    return this.http.post(this.baseUrl,$channel);
  }
  public updateChannelName($id:number, $channel : ChannelType){
    return this.http.put(`${this.baseUrl}?userId=${$id}`, $channel);
  }
  public deactivateChannel($id:number, $userId: number){
    return this.http.delete(`${this.baseUrl}/${$id}?userId=${$userId}`);
  }
}

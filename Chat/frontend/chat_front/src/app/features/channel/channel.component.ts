import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ChannelService } from "../../services/channel.service";
import { UserService } from "../../services/user.service";

@Component({
  standalone: true,
  templateUrl:'./channel.component.html',
  styleUrl:'./channel.component.css'
})

export class ChannelPage{
  public channel = {
    name : '',
    role : []
  }
  public channelMembers = [];

  private activeRouter = inject(ActivatedRoute);
  private channelServiceApi = inject(ChannelService)
  private userServiceApi = inject(UserService);

}

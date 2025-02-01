import {Component, inject, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {ChannelService} from '../../services/channel.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  private userService = inject(UserService);
  private activeRouter        = inject(ActivatedRoute);
  private channelService = inject(ChannelService);
  public channel = {
    name        : '',
    userId  : ''
  }

  public channels = [];

  public ngOnInit(): void {
    this.getUserChannels();
  }
  public getUserChannels(){
    // когато отворя СТРАНИЦАТА, да взема конкретно парче от URL
    const userId = this.activeRouter.snapshot.paramMap.get('id');

    if(userId) {

      this.channel.userId = userId;

      this.channelService.getChannels(userId).subscribe((response: any) => {
        this.channels = response.data;
      })
    }
  }
  public processOnSave() {
    this.channelService.createChannel(this.channel.userId,this.channel.name).subscribe(() => {
      this.getUserChannels();
    })
  }
}

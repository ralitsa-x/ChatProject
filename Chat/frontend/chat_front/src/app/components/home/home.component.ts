import {Component, inject, Inject, OnInit} from '@angular/core';
import { UserService } from '../../services/user.service';
import { ChannelService } from '../../services/channel.service';
import { MessageService } from '../../services/message.service';
import { chatTypes, roles, views } from '../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../models/user.model';
import {ActivatedRoute} from '@angular/router';
import {Channel} from '../../models/channel.model';
import {Message} from '../../models/message.model';
import {ChannelMember} from '../../models/channelMember.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private userService = inject(UserService);
  private activeRouter        = inject(ActivatedRoute);
  private channelService = inject(ChannelService);
  private messageService= inject(MessageService);
  public channel = {
    id:'',
    name        : '',
    userId  : ''
  }

  private messages: Message[]=[];

  public channels: Channel[] = [];
  private currentUserId: string | null = '';
  private selectedChannelId : string | undefined = '';
  private channelMembers:ChannelMember[]=[];

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
  public selectChannel(id: string, type: string) {
    this.currentUserId = this.activeRouter.snapshot.paramMap.get('id');
    if (type === chatTypes.FRIEND) {
      const channelName = `${this.currentUserId}-${id}`;
      const channel = this.channels.find(ch => ch.name === channelName);
      if(channel){
        this.selectedChannelId = channel.id;
        this.messageService.getMessages(channel.id).subscribe(messages => {
          this.messages = messages;
        });
        this.channelService.getChannelMembers(channel.id).subscribe(members =>{
          this.channelMembers = members;
        });
      }
    }else if (type === chatTypes.CHANNEL) {
      this.selectedChannelId = id;
      this.messageService.getMessages(id).subscribe(messages => {
        this.messages = messages;
      });
      this.channelService.getChannelMembers(id).subscribe(members =>{
        this.channelMembers = members;
      });
    }
  }
  public handleSendMessage(content: string) {
    if(!this.selectedChannelId){
      return;
    }
    const messagePayload = {
      content,
      channelId: this.selectedChannelId,
      userId: this.currentUserId
    };
    this.messages.push({
      ...messagePayload,
      user: this.currentUserId,
      timestamp: new Date().toISOString()
    });
    this.messageService.sendMessage(messagePayload);
  }

}

//
//
//
//   async handleCreateChannel(): Promise<void> {
//     try {
//       const newChannel = this.channelService.createChannel(this.user.id, this.newChannelName);
//       this.channels.push(newChannel);
//       this.showCreateChannelModal = false;
//       this.newChannelName = '';
//       this.handleSelect(newChannel.id, chatTypes.CHANNEL);
//       this.view = views.CHANNELS;
//     } catch (error) {
//       console.error('Error creating channel:', error);
//     }
//   }
//
//   handleFindFriends(): void {
//     this.view = views.USERS;
//   }
//
//   handleChannels(): void {
//     this.view = views.CHANNELS;
//   }
//
//   async handleDeleteChannel(): Promise<void> {
//     try {
//       if (!this.selectedChannelId) {
//         return;
//       }
//
//       this.channelService.deleteChannel(this.selectedChannelId, this.user.id);
//       this.channels = this.channels.filter(channel => channel.id !== this.selectedChannelId);
//       this.selectedChannelId = '';
//       this.messages = [];
//       this.channelMembers = [];
//     } catch (error) {
//       console.error('Error deleting channel:', error);
//     }
//   }
//
//   // Polling for messages every 3 seconds
//   ngOnChanges(): void {
//     if (this.selectedChannelId) {
//       const interval = setInterval(async () => {
//         try {
//           this.messageService.getMessages(this.selectedChannelId).subscribe(
//             (messages) => {
//               this.messages = messages;
//             },
//             (error) => {
//               // Handle any errors
//               console.error('Error fetching messages:', error);
//             }
//           );
//         } catch (error) {
//           console.error(error);
//         }
//       }, 3000);
//
//       this.cleanupInterval = () => clearInterval(interval); // Store cleanup function
//     }
//   }
//
//   cleanupInterval?: () => void;
//   protected readonly views = views;
//   protected readonly roles = roles;
// }

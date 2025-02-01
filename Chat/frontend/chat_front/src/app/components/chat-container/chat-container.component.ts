import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { roles } from '../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-chat-container',
  imports: [
    FormsModule
  ],
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.scss'
})
export class ChatContainerComponent implements OnInit, OnChanges{
  @Input() channelName: string = "";
  @Input() channelMembers: any[]=[];
  @Input() isOwner: boolean = false;
  @Input() isAdmin: boolean = false;
  @Input() messages: any[] = [];
  @Input() friends: any[] = [];
  @Output() onSendMessage = new EventEmitter<string>();
  @Output() onRemoveGuest = new EventEmitter<number>();
  @Output() onPromoteToAdmin = new EventEmitter<number>();
  @Output() onAddGuestMember = new EventEmitter<number>();
  @Output() onChangeChannelName = new EventEmitter<string>();
  @Output() onDeleteChannel = new EventEmitter<void>();

  message: string = '';
  showModal: boolean = false;
  nonMembers: any[] = [];
  isEditingName: boolean = false;
  editedChannelName: string = this.channelName;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.editedChannelName = this.channelName; // Reset channel name on changes
  }

  async fetchNonMembers() {
    const memberIds = this.channelMembers.map((member) => member.id);
    this.nonMembers = this.friends.filter((user) => !memberIds.includes(user.id));
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    if (this.message.trim()) {
      this.onSendMessage.emit(this.message);
      this.message = '';
    }
  }

  handleInvite(guestId: number): void {
    this.onAddGuestMember.emit(guestId);
    this.showModal = false;
  }

  handleSaveName(): void {
    this.onChangeChannelName.emit(this.editedChannelName);
    this.isEditingName = false;
  }

  handleDeleteChannel(): void {
    this.onDeleteChannel.emit();
  }

  openModal(content: any) {
    this.fetchNonMembers();
    this.modalService.open(content, { size: 'lg' });
  }

  protected readonly roles = roles;
}

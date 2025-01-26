import { Component, Input, Output, EventEmitter } from '@angular/core';
import { chatTypes, views } from '../../environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() channels: any[] = [];
  @Input() friends: any[] = [];
  @Input() view: string = views.CHANNELS;

  @Output() select = new EventEmitter<{ id: string, type: string }>();
  @Output() createChannel = new EventEmitter<void>();
  @Output() findFriends = new EventEmitter<void>();

  chatTypes = chatTypes;
  views = views;

  onSelect(id: string, type: string): void {
    this.select.emit({ id, type });
  }

  onCreateChannel(): void {
    this.createChannel.emit();
  }

  onFindFriends(): void {
    this.findFriends.emit();
  }
}

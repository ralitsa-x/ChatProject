import { Routes } from '@angular/router';
import { UserPage } from './features/user/user.component';
import { ChannelPage } from './features/channel/channel.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path        : '', component : HomeComponent  },
  { path        : 'users/:id/channels', component   : ChannelPage},
  { path        : 'users', component   : UserPage }
];

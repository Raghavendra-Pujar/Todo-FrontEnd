import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { LoginComponent } from './user/login/login.component';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoModule } from './todo/todo.module';
import { ModalModule, ModalComponent } from 'angular-custom-modal';
import { SocketService } from './socket.service';
import { FriendModule } from './friend/friend.module';
import { SecurityService } from './security.service';
import { NotificationModule } from './notification/notification.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UserModule,
    NotificationModule,
    TodoModule,
    FriendModule,
    FormsModule,
    RouterModule.forRoot([
      { path : 'login', component : LoginComponent, pathMatch : 'full'},
      { path : '', redirectTo: 'login', pathMatch : 'full'},
      { path : '*', component: LoginComponent}
    ])
      
    
  ],
  providers: [AppService,SocketService,SecurityService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr';
import { RouterModule } from '@angular/router';
import { FriendListComponent } from './friend-list/friend-list.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    RouterModule.forChild([
      { path : 'friend-list',component :  FriendListComponent, pathMatch : 'full'}
    ])
  ],



  
  declarations: [FriendListComponent]
})
export class FriendModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    RouterModule.forChild([
      {path : "notifications", component : NotificationComponent ,pathMatch : 'full'}
    ])
  ],
  declarations: [NotificationComponent]
})
export class NotificationModule { }

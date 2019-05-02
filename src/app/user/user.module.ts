import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RouterModule, Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    RouterModule.forChild([
      { path : 'sign-up',component : SignupComponent , pathMatch : 'full'}
    ])
  ],
  declarations: [LoginComponent, SignupComponent, ForgotPasswordComponent]
})
export class UserModule { } 

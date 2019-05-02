import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpErrorResponse, HttpParams} from '@angular/common/http';

import * as io  from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class SocketService {
  private baseUrl = 'http://localhost:3000';
  public socket;
  public authToken = Cookie.get('authToken');
  

  constructor(public http: HttpClient) {
    this.socket = io(this.baseUrl);
   }

   public verifyUser = () =>{
     return Observable.create((observer)=>{
      this.socket.on('verifyUser',(data)=>{
        observer.next();
      })
     })
   }

   setUser() {
     ///console.log(this.authToken)
    this.socket.emit('set-user', this.authToken)
    console.log("setting user")
  }

  authError() {
    return new Observable((obs) => {
      this.socket.on('authError', () => {
        obs.next()
      })
    })
  }



  friendNotification() {
    return new Observable((obs) => {
      this.socket.on('friend-notification', (notificationObj) => {
        obs.next(notificationObj)
      })
    })
  }

  todoCreateNotification() {
    return new Observable((obs) => {
      this.socket.on('todo-notification', (notificationObj) => {
        obs.next(notificationObj)
      })
    })
  }

  disconnect() {
    this.socket.disconnect(true)
    this.socket = undefined
  }

}


  
  


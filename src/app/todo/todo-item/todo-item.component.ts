import { Component, OnInit, ViewContainerRef, Inject, ViewChild } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { ToastsManager } from 'ng2-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import {SocketService} from '../../socket.service';
import * as $ from 'jquery';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SecurityService } from '../../security.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  public todoItemList : Array<any> = [];

  listId: String //current todo id
  userId: String //current user id
  todo // the todo object
  parentItemId: any;
  isNew: boolean = true;
  title: string;
  itemId: any;
  disableUndo: any;
  description : any;
  constructor(public appService: AppService,
    public router: Router,
    private toastr: ToastsManager,
    public socket : SocketService,
    private _route: ActivatedRoute,
    private security : SecurityService,
    vcr: ViewContainerRef) 
    {
      this.toastr.setRootViewContainerRef(vcr);}

  ngOnInit() {
    this.userId = localStorage.getItem('userId')
    this.listId = this._route.snapshot.paramMap.get("listId")

    if (this.userId) {

      if (!this.socket.socket) {
        this.socket.verifyUser().subscribe(() => {
          this.socket.setUser()
          console.log(this.socket.socket)
        })
      }


      this.displayItems()
      this.getNotificationCount()
      this.getRequestCount()
      this.listenForAuthError()
      this.listenForFriendNotification()
      this.listenForToDoNotification()

  }

}


  public displayItems = () => {
    this.appService.listToDoItem(this.listId,this.parentItemId).subscribe((apiResponse: any) => {
      if (apiResponse.data == null) {
        this.toastr.error(apiResponse.message, "Error");
      } else {
        this.todoItemList = apiResponse.data;
        console.log(this.todoItemList)
      }
    }), (err) => {
      this.toastr.error('some error occured')
    }
  }


  listenForAuthError() {
    this.socket.authError().subscribe(() => {
      console.log('Auth error occured')
      this.toastr.info("Redirecting to home", "Invalid/Expired session")
      this.security.logout(false)
    })
  }

  listenForFriendNotification() {
    this.socket.friendNotification().subscribe((notificationObj: any) => {
      this.toastr.info(notificationObj.message, notificationObj.title)
    })
  }

  listenForToDoNotification() {
    this.socket.todoCreateNotification().subscribe((notificationObj: any) => {
      this.toastr.info(notificationObj.message, notificationObj.title)
      

    })
  }

  deleteItem(itemId){
    this.appService.markItemDeleted(this.listId,itemId).subscribe((response : any)=>{

    })
  }

  

  logout() {
    this.socket.disconnect()
    this.security.logout()
  }

  closeItem(itemId) {
    this.appService.closeItem(this.listId, itemId).subscribe((response: any) => {
      if (response.error) {
        this.toastr.error(response.message, 'Error')
      } else {
        console.log(response)
        //this.updateSubTodoItem(response.data)
        this.toastr.success(response.message, 'Success')
      }
    })
  }



  openItem(itemId) {
    this.appService.openItem(this.listId, itemId).subscribe((response: any) => {
      if (response.error) {
        this.toastr.error(response.message, 'Error')
      } else {
        //this.updateSubTodoItem(response.data)
        this.toastr.success(response.message, 'Success')
      }
    })
  }
  


  openCreateNew(parentItemId) {
    this.isNew = true
    this.title = ''
    this.parentItemId = parentItemId
    $('#b').trigger('click')
  }

  openEdit(itemId, title) {
    this.isNew = false
    this.title = title
    this.itemId = itemId
    $('#b').trigger('click')
  }



  public requestCount
  public notificationCount

  getRequestCount() {
    this.appService.friendRequestCount().subscribe((response: any) => {
      if (!response.error) this.requestCount = response.data
    })
  }

  getNotificationCount() {
    this.appService.notificationCount().subscribe((response: any) => {
      if (!response.error) this.notificationCount = response.data
    })
  }



  createTodoItem(){
    if(this.title == null || this.description == null){
      this.toastr.info("Enter title and description");
    }else{
  this.appService.createTodoItem(this.title,this.description,this.listId,this.parentItemId).subscribe((response : any)=>{
    if(response.status === 200){
      this.toastr.success('Item created successfully')
    }else{
      this.toastr.error(response.message)
    }
  }),(err)=>{
    this.toastr.error('some error occured')
  }

  }
}

}

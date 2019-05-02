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
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  
  public todoList: Array<any> = []
  public listtitle ;
  public listDescription;
  public userInfo;
  public disconnectedSocket: boolean; 
  private userId: String // the user whoes todo we are looking at
  private userName: String
  public done : Boolean = false;

  private page = 1;
  public hasMorePages = false
  public allowed = undefined // vairable that can be used for filtering
  public timestamp = null;

  public receiverId: any;
  public receiverName: any;
  //listId: String;
  todo: any;

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

    this.userInfo = this.appService.getUserInfoFromLocalstorage();

    this.receiverId = Cookie.get("receiverId");

    this.receiverName =  Cookie.get('receiverName');

    //console.log(this.receiverId,this.receiverName);
    this.userId = this._route.snapshot.queryParamMap.get("userId") || localStorage.getItem('userId')
    if(this.receiverId!=null && this.receiverId!=undefined && this.receiverId!=''){
  
    this.socket.verifyUser();
    this.socket.setUser();
    this.socket.authError();
  
    this.appService.displayList(this.page,this.userId,this.timestamp).subscribe((response: any) => {
      if (response.data == null){
        console.log("No lists")
        this.toastr.error("No Lists to show");
      }
      
      else {
        this.todoList = this.todoList.concat(response.data);
      }
     // console.log(this.todoList)
  })
 //this.friendRequestNotification();
}

}

public createList = () =>{
if(this.listDescription == null || this.listtitle == null){
this.toastr.error('Plase enter all the fields')
}else{
this.appService.createList(this.listtitle,this.listDescription).subscribe((apiResponse)=>{
  if(apiResponse.status === 200){
    this.toastr.success('List created successfully')
    $("myModal").modal('hide');

  }else{
    this.toastr.error(apiResponse.message)
  }
}),(err)=>{
  this.toastr.error('some error occured')
}
}}


openTodo(listId) {
  this.appService.openTodo(listId).subscribe((response: any) => {
    if (response.error) {
      this.toastr.error(response.message, 'Error')
    } else {
      this.toastr.success(response.message, 'Success')
      this.todo.completed = response.data.completed
    }
  })
}

closeTodo(listId) {
  this.appService.closeTodo(listId).subscribe((response: any) => {
    if (response.error) {
      this.toastr.error(response.message, 'Error')
    } else {
      this.toastr.success(response.message, 'Success')
      this.todo.completed = response.data.completed
    }
  })
}

logout(){
  this.appService.logout().subscribe((response : any) =>{
    if(response.err){

    }else{
      this.toastr.info(response.message)
      this.security.logout(response.message)

    }
  })
}


  }


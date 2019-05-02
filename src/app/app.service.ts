import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HttpResponse, HttpParams } from '@angular/common/http';
@Injectable()
export class AppService {
  public getUserInfoFromLocalstorage = () => {

    return JSON.parse(localStorage.getItem('userInfo'));

  } // end getUserInfoFromLocalstorage


  public setUserInfoInLocalStorage = (data) =>{

    localStorage.setItem('userInfo', JSON.stringify(data));



  }

  
  private baseUrl = "http://localhost:3000";

  constructor(public http : HttpClient) { };

  public signinFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    return this.http.post(`${this.baseUrl}/api/v1/users/login`, params);
  } // end of signinFunction function.

  

  public signupFunction(data) :   Observable <any> {
     const params = new HttpParams()
     .set('firstName', data.firstName)
     .set('lastName', data.lastName)
     .set('email', data.email)
     .set('password', data.password)
     .set('countryCode',data.countryCode)
     .set('mobileNumber', data.mobileNumber)

     return this.http.post(`${this.baseUrl}/api/v1/users/signup`,params)
  }

  public logout() : Observable <any> {
    const authToken = Cookie.get('authToken') || localStorage.getItem('authToken');
    return this.http.post(`${this.baseUrl}/api/v1/users/logout`,authToken)
  }

  public createList(title, description) : Observable<any>{
    let authToken = Cookie.get('authToken');
    const params = new HttpParams()
    .set('title',title)
    .set('description',description)
    .set('authToken',authToken)
    return this.http.post(`${this.baseUrl}/api/v1/todo/createList`, params)
  }
  
  public displayList(page,userId, timestamp?) :  Observable <any>{
    let authToken = Cookie.get('authToken');
    const params = new HttpParams()
    .set('authToken', authToken)
    .set('userId',userId)
    .set('page',page)
    .set('timestamp',timestamp)
    console.log(params)
    return this.http.post(`${this.baseUrl}/api/v1/todo/listAll`, params)
  }


  public addFriend(email: String) : Observable<any>{
    let authToken = Cookie.get('authToken')
    return this.http.post(this.baseUrl + '/api/v1/friend/sendRequest', { authToken: authToken, email: email })
  }

  listRequest(page: Number, timestamp?: number) {
    let authToken = localStorage.getItem('authToken')
    return this.http.post(this.baseUrl + '/api/v1/friend/listFriendRequests', { authToken: authToken, page: page, timestamp })
  }

  listFriends = (page, timestamp?) =>{
    let authToken = localStorage.getItem('authToken')
    return this.http.post(this.baseUrl + '/api/v1/friend/listFriends', { authToken: authToken, page: page, timestamp: timestamp })
  }


  acceptRequest = (userId)=> {
    let authToken = localStorage.getItem('authToken')
    return this.http.post(this.baseUrl + '/api/v1/friend/acceptRequest', { authToken: authToken, userId: userId })
  }

  friendRequestCount = ()=>{
    let authToken = localStorage.getItem('authToken')
    return this.http.post(this.baseUrl + '/api/v1/friend/getRequestCount', { authToken: authToken })
  }

  listNotification = (page: number, timestamp?: number) =>{
    let authToken = localStorage.getItem('authToken')
    return this.http.post(this.baseUrl + '/api/v1/notification/list', { authToken: authToken, page: page })
  }

  notificationCount = () =>{
    let authToken = localStorage.getItem('authToken')
    return this.http.post(this.baseUrl + 'api/v1/notification/getCount', { authToken: authToken })
  }

 


  closeTodo(todoId: String) {
    let authToken = localStorage.getItem('authToken')
    let body = { authToken: authToken, listId: todoId }

    return this.http.post(this.baseUrl + '/api/v1/todo/markListDone', body)
  }

  openTodo(todoId: String) {
    let authToken = localStorage.getItem('authToken')
    let body = { authToken: authToken, listId: todoId }

    return this.http.post(this.baseUrl + '/api/v1/todo/markListNotDone', body)
  }

  createTodoItem(title, description,listId, parentItemId) {
    let authToken = localStorage.getItem('authToken')
    const params = new HttpParams()
    .set('authToken',authToken)
    .set('title',title)
    .set('description',description)
    .set('listId',listId)
    .set('parentTodoId',parentItemId)
    console.log(params)
    return this.http.post(this.baseUrl + '/api/v1/todo/createItem', params)
  }

  listToDoItem(listId,parentTodoId) {
    let authToken = Cookie.get('authToken');
    const params = new HttpParams()
    .set('authToken',authToken)
    .set('listId',listId)
    .set('parentTodoId',parentTodoId)
    console.log(params)
    return this.http.post(this.baseUrl + '/api/v1/todo/listToDoItem', params)
  }

  markItemDeleted(todoId: String, itemId: String) {
    let authToken = localStorage.getItem('authToken')
    let body = { authToken: authToken, todoId: todoId, itemId: itemId }
    return this.http.post(this.baseUrl + '/api/v1/todo/markItemDeleted', body)
  }

  closeItem(todoId, itemId) {
    let authToken = localStorage.getItem('authToken')
    const params = new HttpParams()
    .set( 'authToken', authToken)
    .set( 'listId', todoId)
    .set( 'todoId', itemId)
    console.log(params)
    return this.http.post(this.baseUrl + '/api/v1/todo/closeItem', params)
  }

  openItem(todoId, itemId) {
    let authToken = localStorage.getItem('authToken')
    const params = new HttpParams()
    .set( 'authToken', authToken)
    .set( 'listId', todoId)
    .set( 'todoId', itemId)
    console.log(params)
    return this.http.post(this.baseUrl + '/api/v1/todo/openItem', params)
  }



  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if

    console.error(errorMessage);

    return Observable.throw(errorMessage);

  }

// END handleError




}

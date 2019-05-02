import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SocketService } from '../../socket.service';
import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { SecurityService } from '../../security.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  public friendList: Array<any> = []
  public requestList: Array<any> = []
  private friendPage: number = 1
  private requestPage: number = 1
  public hasMoreFriend: boolean = false
  public hasMoreRequest: boolean = false
  public email: String
  private timestampFriend: number = null
  private timestampRequest: number = null
  private userId
  public gettingFriendData = false
  public gettingRequestData = false

  constructor(public appService: AppService,
    public security : SecurityService,
    public router: Router,
    private toastr: ToastsManager,
    public socket : SocketService,
    vcr: ViewContainerRef) {
    
      this.toastr.setRootViewContainerRef(vcr);} 

  ngOnInit() {
    this.userId = localStorage.getItem('userId');



    if (this.userId) {
      console.log(this.socket.socket)
      if (!this.socket.socket) {
        this.socket.verifyUser().subscribe(() => {
          this.socket.setUser()
          console.log(this.socket.socket)
        })
      }

      this.getFriendList()
      this.getRequestList()
      this.getNotificaitonCount()
      this.listenForAuthError()
      this.listenForToDoNotification()
      this.listenForFriendNotification()
  }
}


getFriendList() {
  this.gettingFriendData = true
  this.appService.listFriends(this.friendPage, this.timestampFriend).subscribe((response: any) => {
    this.gettingFriendData = false
    if (!response.err && response.data) {
      if (!this.timestampFriend) this.timestampFriend = response.timestamp
      if (response.data.length > 0) {
        this.friendList = this.friendList.concat(response.data)
        this.friendPage += 1
        // if the length of data array is equal to max items per page then there maybe more pages, but if not, there cannot be more pages
        if (response.data.length == this.security.ItemPerPage) this.hasMoreFriend = true
        else this.hasMoreFriend = false
      } else {
        this.hasMoreFriend = false
        this.toastr.info("There are no more friends.",null,{dismiss : 'click'})
       
      }
    } else {
      this.toastr.error(response.message, "Error")
    }
  })
}

getRequestList() {
  this.gettingRequestData = true

  this.appService.listRequest(this.requestPage, this.timestampRequest).subscribe((response: any) => {
    this.gettingRequestData = false
    if (!response.error && response.data) {
      if (!this.timestampRequest) this.timestampRequest = response.timestamp
      if (response.data.length > 0) {

        this.requestList = this.requestList.concat(response.data)
        this.requestPage += 1
        // if the length of data array is equal to max items per page then there maybe more pages, but if not, there cannot be more pages
        if (response.data.length == this.security.ItemPerPage) this.hasMoreRequest = true
        else this.hasMoreRequest = false
      } else {
        this.hasMoreRequest = false
        this.toastr.info("There are no more requests.", "",{dismiss : 'auto'})
      }
    } else {
      this.toastr.error(response.message, "Error")
    }

  })
}

logout() {
  console.log(this.socket.socket)
  this.socket.disconnect()
}
addFriend() {

  this.appService.addFriend(this.email).subscribe((response: any) => {
    console.log(response)
    if (!response.error) {
      this.toastr.success(response.message, "Success")
      this.email = ''
    } else {
      this.toastr.error(response.message, "Error")
    }
  })

}

acceptRequest(userId: String) {


  this.appService.acceptRequest(userId).subscribe((response :any) => {

    if (!response.error) {

      this.toastr.success(response.message, "Success")

      // find and remove the added friend from request array and add him to friend array
      let index = this.requestList.findIndex((request) => {
        return request.sender.userId == userId
      })
      let request = this.requestList.splice(index, 1)[0]
      console.log(request)

      let newFriend = {
        friend: {
          firstName: request.sender.firstName,
          lastName: request.sender.lastName
        },
        friendId: request.sender.userId
      }
      this.friendList.unshift(newFriend)


    } else {

      this.toastr.error(response.message, "Error")
    }
  })

}


listMoreRequest() {
  this.getRequestList()
}

listMoreFriend() {
  this.getFriendList()
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
      this.toastr.success(notificationObj.message, notificationObj.title)
    })
  }

  listenForToDoNotification() {
    this.socket.todoCreateNotification().subscribe((notificationObj: any) => {
      this.toastr.success(notificationObj.message, notificationObj.title)
    })
  }

  public notificationCount

  getNotificaitonCount() {
    this.appService.notificationCount().subscribe((response: any) => {
      if (!response.error) this.notificationCount = response.data
    })
  }


}

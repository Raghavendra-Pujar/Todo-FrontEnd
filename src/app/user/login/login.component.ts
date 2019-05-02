import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AppService } from '../../app.service';
import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: any;
  public password: any;
  public data ={};

  constructor(
    public appService: AppService,
    public router: Router,
    private toastr: ToastsManager,
    vcr: ViewContainerRef,
  ) {

    this.toastr.setRootViewContainerRef(vcr);

  }


  ngOnInit() {
  }

  public goToSignUp: any = () => {

    this.router.navigate(['/sign-up']);

  } // end goToSignUp


  public signinFunction: any = () => {
   
    
      if (!this.email) {
      this.toastr.warning('enter email')


    } else if (!this.password) {

      this.toastr.warning('enter password')


    } else {

      let data = {
        email: this.email,
        password: this.password
      }
    
    
    

    this.appService.signinFunction(data)
        .subscribe((apiResponse) => {
          console.log(apiResponse)
          if (apiResponse.status === 200) {
           
            this.toastr.success('Login Successfull');
         
             Cookie.set('authToken', apiResponse.data.authToken);
            
             Cookie.set('receiverId', apiResponse.data.userDetails.userId);
            
             Cookie.set('receiverName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);
             localStorage.setItem('authToken', apiResponse.data.authToken)
             localStorage.setItem('firstName', apiResponse.data.firstName)
             localStorage.setItem('userId', apiResponse.data.userId)
             this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails)
             setTimeout(() => {
              this.router.navigate(['/todoList']);
            }, 2000);
             

          } else {
            //console.log(apiResponse)
            this.toastr.error(apiResponse.message)
        
          }

        }, (err) => {
          this.toastr.error('some error occured');

        });
    }
  }
}

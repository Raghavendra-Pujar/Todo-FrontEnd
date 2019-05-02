import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

@Injectable()
export class SecurityService {
  public ItemPerPage = 10
  constructor(private _router: Router, private toastr: ToastsManager) { }
  verifyUserLoginAndReroute() {

    if (!localStorage.getItem('userId')) {
      this.logout(false)
      this.toastr.info("Redirecting to home", "Invalid/Expired session")
    }
  }

  logout(showMessage:Boolean = true) {
    localStorage.clear()
    this._router.navigate(['/login'])
    if(showMessage) this.toastr.success("User successfuly logged out", "Success")
  }
}

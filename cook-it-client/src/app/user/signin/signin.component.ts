import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss', '../userFormStyles.scss']
})
export class SigninComponent {
  usernameFromRegister = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.usernameFromRegister = this.router.getCurrentNavigation().extras.state?.username;
  }

  submitFormHandler(data) {
    this.isLoading = true;
    
    this.userService.signIn(data).subscribe(res => {
      this.isLoading = false;
      const { accessToken } = res;
      this.userService.accessToken = accessToken;
      localStorage.setItem('user', accessToken);
      this.router.navigate(['/']);
      this.toastrService.success('Successfully logged in!');
    }, 
    err => {
      console.log(err);
      setTimeout(() => {
        this.errorMessage = err.error.message;
        this.isLoading = false;
      }, 1000);
    });
  }

}

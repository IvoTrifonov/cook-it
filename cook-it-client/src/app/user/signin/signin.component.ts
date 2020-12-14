import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { getLocalUser } from 'src/app/core/helpers/getLocalUser';

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
      localStorage.setItem('user', accessToken);
      this.userService.user = getLocalUser();
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

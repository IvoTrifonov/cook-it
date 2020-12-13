import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { rePasswordValidatorFactory, ValidateUsername } from 'src/app/shared/validators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../userFormStyles.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastrService: ToastrService
  ) {

    const passwordControl = this.fb.control('', [Validators.required, Validators.minLength(6)]);

    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)], ValidateUsername.createValidator(this.userService)],
      email: ['', [Validators.required, Validators.email]],
      password: passwordControl,
      rePassword: ['', [Validators.required, Validators.minLength(6), rePasswordValidatorFactory(passwordControl)]],
    });
  }

  ngOnInit(): void {
  }

  submitFormHandler() {
    this.isLoading = true;
    const data = this.form.value;
    
    this.userService.signUp(data).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/user/signin'], { state: { username: this.form.get('username').value } });
        this.toastrService.success('Successful registration');
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });

  }

}

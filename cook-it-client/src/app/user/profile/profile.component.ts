import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: string;

  get user() {
    return this.userService.accessToken;
  }

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if (this.user) {
      this.username = jwtDecode(this.user);
    }
  }

}

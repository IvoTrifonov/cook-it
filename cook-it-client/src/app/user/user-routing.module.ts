import { Type } from '@angular/compiler/src/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessGuard } from '../guards/access.guard';
import { ProfileComponent } from './profile/profile.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: 'user',
    canActivate: [AccessGuard],
    children: [
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  }
];

export const UserRoutingModule = RouterModule.forChild(routes);
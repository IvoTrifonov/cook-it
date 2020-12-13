import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
    private toaster: ToastrService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.checkIfLogged(state.url);
  }

  checkIfLogged(url: string): boolean {
    const isLogged = !!this.userService.accessToken;
    let canPass = true;

    if (isLogged) {
      if (url === '/user/signin' || url === '/user/signup') {
        this.router.navigateByUrl('/');
        canPass = false;
      }
    } else {
      if (url === '/user/profile' || url === '/recipes/create') {
        this.toaster.warning('You have to sign in!');
        this.router.navigateByUrl('/user/signin');
        canPass = false;
      }
    }

    return canPass;
  }
}

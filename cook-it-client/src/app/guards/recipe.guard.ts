import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Recipe } from '../recipe/create-recipe/recipeModel';
import { IRecipe } from '../recipe/interfaces/IRecipe';
import { RecipeService } from '../recipe/recipe.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
    private recipeService: RecipeService,
    private toaster: ToastrService,
    private route: ActivatedRoute
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const urlArray = state.url.split('/');
    const recipeID = +urlArray[urlArray.length - 1];

    return this.checkIfLogged() && this.chekIfUserIsCreator();
  }

  checkIfLogged(): boolean {
    const isLogged = !!this.userService.user;

    if (!isLogged) {
      this.toaster.warning('You have to sign in!');
      this.router.navigateByUrl('user/signin');
      return false;
    }
    
    return true;
  }
  
  chekIfUserIsCreator() : boolean {
    const user = this.userService.user;
    const recipeOwnerId = this.recipeService.recipeOwnerId;
    let isCreator = false;  
    
    if (user.id === recipeOwnerId) {
      isCreator = true;
    } else {
      isCreator = false;
      this.toaster.error(`Can modify only your recipes!`);
      this.router.navigate([`/recipes/${recipeOwnerId}`]);
    }

    return isCreator;
  }
}
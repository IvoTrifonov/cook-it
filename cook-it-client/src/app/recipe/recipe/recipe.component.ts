import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { formatPrepTime } from '../helpers/formatPrepTime';
import { UserService } from 'src/app/user/user.service';
import { IRecipe } from '../interfaces/IRecipe';
import { IUser } from 'src/app/user/interfaces/IUser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  recipe: IRecipe;
  createdBy: IUser;
  get loggedUser() { return this.userService.user }

  constructor(
    private route: ActivatedRoute,
    private recipeServcie: RecipeService,
    private userService: UserService,
    private router: Router,
    private toaster: ToastrService
  ) { 
    console.log(this.loggedUser);
  }

  ngOnInit(): void {
    const recipeId = +this.route.snapshot.paramMap.get('id');

    this.recipeServcie.getRecipeById(recipeId).subscribe((recipe: IRecipe) => {
      this.recipe = recipe;

      this.userService.getUserById(this.recipe.userId).subscribe((user: IUser) => {
        this.createdBy = user;
      })
    }, err => {
      this.router.navigate(['/notFound']);
    });
  }

  deleteRecipe(id: number) {
    console.log(id);
    this.recipeServcie.deleteRecipeById(id).subscribe(() => {
      this.toaster.success('Successfuly deleted recipe!');
      this.router.navigate([`/recipes/explore`]);
    });
  }

  formatPrepTime = formatPrepTime;
}

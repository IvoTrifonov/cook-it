import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { UserService } from 'src/app/user/user.service';
import { IRecipe } from '../interfaces/IRecipe';
import { IUser } from 'src/app/user/interfaces/IUser';
import { ToastrService } from 'ngx-toastr';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  animations: [
    trigger('recipeAnimation', [
      transition(':enter', [
        style({
          transform: 'scaleY(0)'
        }),
        animate('200ms')
      ])
    ])
  ]
})
export class RecipeComponent implements OnInit {
  recipe: IRecipe;
  createdBy: IUser;
  get loggedUser() { return this.userService.user }

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private userService: UserService,
    private router: Router,
    private toaster: ToastrService
  ) { 
    console.log(this.loggedUser);
  }

  ngOnInit(): void {
    const recipeId = +this.route.snapshot.paramMap.get('id');

    this.recipeService.getRecipeById(recipeId).subscribe((recipe: IRecipe) => {
      this.recipe = recipe;
      this.recipeService.recipeOwnerId = recipe.userId;

      this.userService.getUserById(this.recipe.userId).subscribe((user: IUser) => {
        this.createdBy = user;
      })
    }, err => {
      this.router.navigate(['/notFound']);
    });
  }

  deleteRecipe(id: number) {
    this.recipeService.deleteRecipeById(id).subscribe(() => {
      this.toaster.success('Successfuly deleted recipe!');
      this.router.navigate([`/recipes/explore`]);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/recipe/create-recipe/recipeModel';
import { RecipeService } from 'src/app/recipe/recipe.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  recipes: Recipe[];
  get user() { return this.userService.user }

  constructor(
    private userService: UserService,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.recipeService.getUserRecipes(this.user.id.toString()).subscribe(recipes => {
      this.recipes = recipes;
    })
  }
}

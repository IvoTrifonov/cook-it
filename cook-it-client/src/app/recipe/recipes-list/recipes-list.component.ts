import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../create-recipe/recipeModel';
import { RecipeService } from '../recipe.service';
import { formatPrepTime } from '../helpers/formatPrepTime';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  isLoading = false;
  querySubscribtion: Subscription;
  recipes: Recipe;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {

    this.querySubscribtion = this.route.queryParams.subscribe(() =>{
      const query = this.router.url;

      this.recipeService.getRecipes(query).subscribe(recipes => {
        this.isLoading = true;
        
        setTimeout(() => {
          this.recipes = recipes;
          this.isLoading = false
        }, 500);
      });
    });
  }
  
  ngOnDestroy(): void {
    this.querySubscribtion.unsubscribe();
  }

  formatPrepTime = formatPrepTime;
}

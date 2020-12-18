import { Component, OnDestroy, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../create-recipe/recipeModel';
import { RecipeService } from '../recipe.service';
import { animate, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  animations: [
    trigger('recipeAnimation', [
      transition(':enter', [
        style({transform: 'scaleX(0)'}),
        animate('160ms')
      ])
    ])
  ]
})
export class RecipesListComponent implements OnInit, OnDestroy {
  isOpen = false;
  isLoading = false;
  querySubscribtion: Subscription;
  recipes: Recipe;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.isOpen = true;
    this.querySubscribtion = this.route.queryParams.subscribe(() => {
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
}

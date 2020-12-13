import { Type } from '@angular/compiler/src/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessGuard } from '../guards/access.guard';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { ExploreComponent } from './explore/explore.component';
import { RecipesComponent } from './recipes/recipes.component';

const routes: Routes = [
  {
    path: 'recipes',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: RecipesComponent
      },
      {
        path: 'create',
        canActivate: [AccessGuard],
        component: CreateRecipeComponent
      },
      {
        path: 'explore',
        component: ExploreComponent
      }
    ]
  }
];

export const RecipeRoutingModule = RouterModule.forChild(routes);
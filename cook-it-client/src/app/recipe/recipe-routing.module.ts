import { RouterModule, Routes } from '@angular/router';
import { AccessGuard } from '../guards/access.guard';
import { RecipeGuard } from '../guards/recipe.guard';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { EditComponent } from './edit/edit.component';
import { ExploreComponent } from './explore/explore.component';
import { FindComponent } from './find/find.component';
import { RecipeComponent } from './recipe/recipe.component';
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
        path: 'find',
        component: FindComponent
      },
      {
        path: 'explore',
        component: ExploreComponent
      },
      {
        path: ':id',
        component: RecipeComponent
      },
      {
        path: 'edit/:id',
        canActivate: [RecipeGuard],
        component: EditComponent
      }
    ]
  }
];

export const RecipeRoutingModule = RouterModule.forChild(routes);
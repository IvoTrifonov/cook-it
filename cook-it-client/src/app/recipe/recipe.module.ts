import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes/recipes.component';
import { SharedModule } from '../shared/shared.module';
import { RecipeRoutingModule } from './recipe-routing.module';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { FormsModule } from '@angular/forms';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
import { ExploreComponent } from './explore/explore.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { EditComponent } from './edit/edit.component';
import { FindComponent } from './find/find.component';

@NgModule({
  declarations: [
    RecipesComponent,
    CreateRecipeComponent,
    ExploreComponent,
    RecipesListComponent,
    RecipeComponent,
    EditComponent,
    FindComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RecipeRoutingModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'dd2an9hq9'}),
  ],
  exports: [
    RecipesListComponent
  ]
})
export class RecipeModule { }

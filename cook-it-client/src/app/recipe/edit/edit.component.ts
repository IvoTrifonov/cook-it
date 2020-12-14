import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Recipe } from '../create-recipe/recipeModel';
import { setPreparationTime } from '../helpers/setPreparationTime';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['../create-recipe/create-recipe.component.scss']
})
export class EditComponent implements OnInit {
  isLoading = false;
  recipeID = +this.route.snapshot.paramMap.get('id');
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private toaster: ToastrService,
  ) { }

  ngOnInit(): void {
    this.recipeService.getRecipeById(this.recipeID).subscribe((recipe: Recipe) => {
      this.recipe = recipe;
      this.recipe.hours = Math.floor(recipe.prepTime / 60);;
      this.recipe.minutes = Math.round((recipe.prepTime / 60 - this.recipe.hours) * 60);
    }, err => this.router.navigate(['/notFound']));
  }

  submitFormHandler(recipeForm) {
    this.isLoading = true;
    this.recipe.prepTime = setPreparationTime(recipeForm.hours, recipeForm.minutes);
    this.recipe = { ...this.recipe, ...recipeForm };
    delete this.recipe.hours;
    delete this.recipe.minutes;

    this.recipeService.editRecipeById(this.recipeID, this.recipe).subscribe(res => {
      setTimeout(() => {
        this.isLoading = false;
        this.toaster.success('Successfuly edit recipe!')
        this.router.navigate([`/recipes/${this.recipeID}`]);
      }, 500);
    })
  }
}

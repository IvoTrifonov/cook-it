import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/image.service';
import { RecipeService } from '../recipe.service';
import { Recipe } from './recipeModel';
import { setPreparationTime } from '../helpers/setPreparationTime';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent {
  isLoading = false;

  @ViewChild('ingredients') ingredients: ElementRef;
  ingredientsArr: string[] = [];

  imageFile: File;

  constructor(
    private renderer: Renderer2,
    private imageService: ImageService,
    private recipeService: RecipeService,
    private router: Router,
    private toaster: ToastrService
  ) { }

  submitFormHandler(recipe: Recipe): void {
    this.isLoading = true;
    recipe.ingredients = this.ingredientsArr;
    recipe.prepTime = setPreparationTime(recipe.hours, recipe.minutes);

    delete recipe.minutes;
    delete recipe.hours;

    this.imageService.uploadImage(this.imageFile).subscribe(imageURL => {
      recipe.imageURL = imageURL;

      this.recipeService.create(recipe).subscribe(res => {
        this.toaster.success('Created new recipe!');
        this.router.navigate(['/recipes/explore']);
      }, err => this.router.navigate(['/recipes/explore']));
    });
  }

  appendIngredient(input) {
    if (input.value) {
      const li = this.renderer.createElement('li');
      const text = this.renderer.createText(`${this.ingredientsArr.length > 0 ? ', ' : ''}` + input.value);

      this.renderer.appendChild(li, text);
      this.renderer.appendChild(this.ingredients.nativeElement, li);
      this.ingredientsArr.push(input.value);
      input.value = '';
    }
  }

  imageInputChange(imageInput: any) {
    this.imageFile = imageInput.files[0];
  }
}

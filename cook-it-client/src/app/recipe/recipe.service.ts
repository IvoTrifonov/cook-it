import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from './create-recipe/recipeModel';
import { environment } from '../../environments/environment';
const { baseUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(
    private http: HttpClient
  ) {

  }

  create(recipe: Recipe): Observable<any> {
    return this.http.post(`${baseUrl}/recipes`, recipe, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('user')}`
      }
    });
  }

  getRecipes(query) : Observable<any> {
    return this.http.get(`${baseUrl}${query}`);
  }
}

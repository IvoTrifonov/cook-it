import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from './create-recipe/recipeModel';
import { environment } from '../../environments/environment';
const { baseUrl } = environment;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('user')}`
};

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeOwnerId: number;

  constructor(
    private http: HttpClient
  ) {

  }

  create(recipe: Recipe): Observable<any> {
    return this.http.post(`${baseUrl}/recipes`, recipe, { headers });
  }

  getRecipes(query) : Observable<any> {
    return this.http.get(`${baseUrl}${query}`);
  }

  getRecipeById(id: number) : Observable<any> {
    return this.http.get(`${baseUrl}/recipes/${id}`);
  }

  editRecipeById(id: number, recipe: Recipe) : Observable<any> {
    return this.http.patch(`${baseUrl}/recipes/${id}`, recipe, { headers })
  }

  deleteRecipeById(id: number) {
    return this.http.delete(`${baseUrl}/recipes/${id}`, { headers })
  }

  getRecipesByKeywords(keywords: string[]) : Observable<any> {
    const params = { keywords: keywords };

    console.log(params);
    return this.http.get(`${baseUrl}/recipes/search`, { params: params });
  }
}

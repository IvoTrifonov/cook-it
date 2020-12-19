import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from './create-recipe/recipeModel';
import { environment } from '../../environments/environment';
import { UserService } from '../user/user.service';
const { baseUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeOwnerId: number;

  constructor(
    private http: HttpClient,
    private userService: UserService
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

  getRecipes(query): Observable<any> {
    return this.http.get(`${baseUrl}${query}`);
  }

  getRecipeById(id: number): Observable<any> {
    return this.http.get(`${baseUrl}/recipes/${id}`);
  }

  editRecipeById(id: number, recipe: Recipe): Observable<any> {
    return this.http.patch(`${baseUrl}/recipes/${id}`, recipe,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('user')}`
        }
      })
  }

  deleteRecipeById(id: number) {
    return this.http.delete(`${baseUrl}/recipes/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('user')}`
        }
      })
  }

  getRecipesByKeywords(keywords: string[]): Observable<any> {
    const params = { keywords };

    return this.http.get(`${baseUrl}/recipes/search`, { params });
  }

  getUserRecipes(userId: string): Observable<any> {
    const params = { userId }

    return this.http.get(`${baseUrl}/recipes/user`, { params });
  }
}

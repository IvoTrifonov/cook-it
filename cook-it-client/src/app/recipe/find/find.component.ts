import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { of, Subject, Subscription } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, filter, map, mergeMap, tap } from 'rxjs/operators';
import { Recipe } from '../create-recipe/recipeModel';
import { RecipeService } from '../recipe.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
const { baseUrl } = environment;

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss']
})
export class FindComponent implements OnInit, OnDestroy {
  keyUp = new Subject<KeyboardEvent>();
  @ViewChild('results') results: ElementRef;
  @ViewChild('resultsUl') resultsUl: ElementRef;
  isLoading = false;
  private subscription: Subscription;

  constructor(
    private renderer: Renderer2,
    private recipeService: RecipeService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.subscription = this.keyUp.pipe(
      map(event => event.target['value']),
      tap(() => {
        this.renderer.setStyle(this.results.nativeElement, 'display', 'block');
      }),
      debounceTime(600),
      distinctUntilChanged(),
      filter(e => e && e),
      mergeMap(search => of(search).pipe(
        delay(400)
      )),
    ).subscribe(value => {
      this.isLoading = true;

      const keywords = value.trim().split(' ');
      this.recipeService.getRecipesByKeywords(keywords).subscribe((recipes: Recipe[]) => {
        this.isLoading = false;
        this.appendRecipes(recipes)
      })
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private appendRecipes(recipes: Recipe[]) {
    const childElements = this.resultsUl.nativeElement.childNodes;
    for (let child of childElements) {
      this.renderer.removeChild(childElements, child);
    }

    if (recipes.length === 0) {
      this.renderer.appendChild(this.resultsUl.nativeElement,
        this.renderer.createText('Nothing to show'));
    }

    recipes.forEach(recipe => {
      //li
      const li = this.renderer.createElement('li');
      const a = this.renderer.createElement('a');
      const img = this.renderer.createElement('img');

      this.renderer.listen(a, 'click', (event) => {
        this.router.navigate([`recipes/${recipe.id}`]);
      });

      this.renderer.setAttribute(img, 'src', recipe.imageURL);
      this.renderer.appendChild(a, img);
      this.renderer.appendChild(a, this.renderer.createText(`${recipe.title}`));
      this.renderer.appendChild(li, a);

      this.renderer.appendChild(this.resultsUl.nativeElement, li);
    });
  }
}

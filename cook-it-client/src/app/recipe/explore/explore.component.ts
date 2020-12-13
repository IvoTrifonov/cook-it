import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { setPreparationTime } from '../helpers/setPreparationTime';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  @ViewChild('category') category: ElementRef;
  @ViewChild('difficulty') difficulty: ElementRef;
  @ViewChild('hours') hours: ElementRef;
  @ViewChild('minutes') minutes: ElementRef;
  @ViewChild('ingredients') ingredients: ElementRef;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  handleFilters() {
    this.router.navigate(['/recipes/explore'], {
      queryParams: {
        ...this.setQuery()
      }
    });
  }

  private setQuery() {
    const category = this.category.nativeElement.value;

    return {
      category: category || null,
      difficulty: this.difficulty.nativeElement.value || null,
      prepTime: setPreparationTime(
        +this.hours.nativeElement.value,
        +this.minutes.nativeElement.value
      ) || null,
      ingredients: this.getIngredients()
    }
  }

  private getIngredients(): string[] {
    return this.ingredients.nativeElement.value
      .replace(/\s+/g, ' ')
      .split(',')
      .filter(i => i !== '');
  }
}

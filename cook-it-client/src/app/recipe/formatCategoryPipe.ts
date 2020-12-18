import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCategory'
})
export class FormatCategoryPipe implements PipeTransform {
  transform(category: string) {
    category = category.split('_').join(' ').toString().toLowerCase();
    return category;
  }

}
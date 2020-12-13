enum RecipeCategory {
  SOUP = 'SOUP',
  SALAD = 'SALAD',
  DRINK = 'DRINK',
  DESSERT = 'DESSERT',
  MAIN_DISH = 'MAIN_DISH',
  SAUCE = 'SAUCE',
}

enum Difficulty {
  EASY = 'EASY',
  NORMAL = 'NORMAL',
  HARD = 'HARD'
}

export class Recipe {
  constructor(
    public title: string,
    public imageURL: string,
    public description: string,
    public ingredients: string[],
    public category: RecipeCategory,
    public difficulty: Difficulty,
    public prepTime: number,
    public hours?: number,
    public minutes?: number
  ) { }
}
export interface IRecipe {
  id: number;
  title: string;
  description: string;
  imageURL: string;
  category: string;
  difficulty: string;
  prepTime: number;
  ingredients: string[];
  userId: number;
}
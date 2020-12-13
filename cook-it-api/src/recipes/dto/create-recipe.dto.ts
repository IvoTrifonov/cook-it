import { Optional } from '@nestjs/common';
import { Transform } from 'class-transformer/decorators';
import { IsArray, isArray, isIn, IsIn, isNotEmpty, IsNotEmpty, IsPositive } from 'class-validator';
import { RecipeCategory } from '../recipe.category.enum';
import { RecipeDifficulty } from '../recipe.difficulty.enum';

export class CreateRecipeDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  imageURL: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @Transform(difficulty => difficulty.toUpperCase())
  @IsIn(Object.keys(RecipeDifficulty))
  difficulty: RecipeDifficulty;

  @IsPositive()
  prepTime: number;

  @IsArray()  
  ingredients: string[];

  @IsNotEmpty()
  @Transform(category => category.toUpperCase())
  @IsIn(Object.keys(RecipeCategory))
  category: RecipeCategory;
}

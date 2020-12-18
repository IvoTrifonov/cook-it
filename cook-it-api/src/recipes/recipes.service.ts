import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity'
  ;
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Recipe } from './recipe.entity';
import { RecipeRepository } from './recipe.repository';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(RecipeRepository)
    private recipeRepository: RecipeRepository
  ) { }

  createRecipe(
    createRecipeDto: CreateRecipeDto,
    user: User
  ): Promise<Recipe> {
    return this.recipeRepository.createRecipe(createRecipeDto, user);
  }

  async getRecipeById(id: number): Promise<Recipe> {
    const foundRecipe = await this.recipeRepository.findOne({ id });

    if (!foundRecipe) { throw new NotFoundException(`Recipe with id ${id} not found!`); }

    return foundRecipe;
  }

  async updateRecipe(id: number, createRecipeDto: CreateRecipeDto, userId: number): Promise<Recipe> {
    const { title, category, description, difficulty, prepTime } = createRecipeDto;
    const recipe = await this.getRecipeById(id);

    if (recipe.userId !== userId) {
      throw new UnauthorizedException(`User can modify only own recepies!`);
    }

    recipe.title = title;
    recipe.category = category;
    recipe.description = description;
    recipe.difficulty = difficulty;
    recipe.prepTime = prepTime;
    
    await recipe.save();
    return recipe;
  }

  async deleteRecipe(id: number, userId: number): Promise<void> {
    const { affected } = await this.recipeRepository.delete({ id, userId });

    if (!affected) {
      throw new NotFoundException(`Task with ID ${id} not found!`);
    }
  }

  getRecipes(query) : Promise<Recipe[]> {
    return this.recipeRepository.getRecipes(query);
  }

  getRecipesByKeywords(keywords : string[]): Promise<Recipe[]> {
    return this.recipeRepository.getRecipesByKeywords(keywords);
  }

  async getUserRecipes(userId: string): Promise<Recipe[]> {
    const recipes = this.recipeRepository.find({ userId: +userId });
    return recipes;
  }
}

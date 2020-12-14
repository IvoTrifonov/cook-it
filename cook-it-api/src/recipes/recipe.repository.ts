import { InternalServerErrorException, Logger } from "@nestjs/common";
import { User } from '../auth/user.entity';
import { Brackets, EntityRepository, LessThan, MoreThan, Repository } from "typeorm";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { Recipe } from "./recipe.entity";

@EntityRepository(Recipe)
export class RecipeRepository extends Repository<Recipe> {
  private logger = new Logger();

  async createRecipe(
    createRecipeDto: CreateRecipeDto,
    user: User
  ): Promise<Recipe> {
    const { title, description, category, prepTime, difficulty, imageURL, ingredients } = createRecipeDto;

    const recipe = new Recipe();
    recipe.title = title;
    recipe.description = description;
    recipe.category = category;
    recipe.ingredients = ingredients;
    recipe.prepTime = prepTime;
    recipe.difficulty = difficulty;
    recipe.imageURL = imageURL;
    recipe.user = user;

    await recipe.save();
    this.logger.verbose(`Created recipe with data: ${JSON.stringify(createRecipeDto)}`);

    delete recipe.user;
    return recipe;
  }

  async getRecipes(query): Promise<Recipe[]> {
    const { category, difficulty, prepTime, ingredients } = query;
    const queryBuilder = this.createQueryBuilder('recipe');

    if (category) {
      queryBuilder.andWhere('recipe.category = :category', { category });
    }

    if (difficulty) {
      queryBuilder.andWhere('recipe.difficulty = :difficulty', { difficulty });
    }

    if (prepTime) {
      queryBuilder.andWhere('recipe.prepTime <= :prepTime', { prepTime: +prepTime });
    }
    
    // if (ingredients) {
    //   queryBuilder.andWhere('recipe.ingredients ALL(:...ingredients)', { ingredients });
    // }

    try {
      const recipes = await queryBuilder.getMany();
      return recipes;
    } catch (error) {
      this.logger.error(`Failed to get recipes with filters: ${query}`);
      throw new InternalServerErrorException();
    }

  }
}
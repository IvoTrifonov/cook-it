import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Recipe } from './recipe.entity';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {

  constructor(private recipesService: RecipesService) { }

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  createRecipe(
    @Body() createRecipeDto: CreateRecipeDto,
    @GetUser() user: User
  ): Promise<Recipe> {
    return this.recipesService.createRecipe(createRecipeDto, user);
  }

  @Get('/explore')
  getRecipes(
    @Query() query
  ) : Promise<Recipe[]> {
    return this.recipesService.getRecipes(query);
  }

  @Get('/:id')
  getRecipeById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Recipe> {
    return this.recipesService.getRecipeById(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  updateRecipe(
    @Param('id', ParseIntPipe) recipeId: number,
    @Body() createRecipeDto: CreateRecipeDto,
    @GetUser() user: User
  ): Promise<Recipe> {
    console.log(recipeId);
    console.log(createRecipeDto);
    return this.recipesService.updateRecipe(recipeId, createRecipeDto, user.id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteRecipe(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<void> {
    return this.recipesService.deleteRecipe(id, user.id);
  }

}

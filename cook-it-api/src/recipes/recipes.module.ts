import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RecipeRepository } from './recipe.repository';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecipeRepository]),
    AuthModule
  ],
  controllers: [RecipesController],
  providers: [RecipesService]
})
export class RecipesModule {}

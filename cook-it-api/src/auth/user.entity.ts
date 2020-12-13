import { Recipe } from "src/recipes/recipe.entity";
import * as bcrypt from 'bcrypt';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm"

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(type => Recipe, recipe => recipe.user, { eager: true })
  recipes: Recipe[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  };
}
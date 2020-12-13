
import { User } from "../auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  imageURL: string;

  @Column()
  difficulty: string;

  @Column({ type: 'integer' })
  prepTime: number;

  @Column('text', { array: true })
  ingredients: string[];

  @Column()
  category: string;

  @ManyToOne(type => User, user => user.recipes, { eager: false })
  user: User;

  @Column()
  userId: number;
}
import { Post } from "./Posts";
import { Entity, Column, OneToMany } from "typeorm";
import Model from "./Model";
import { IsEmail, Length } from "class-validator";

@Entity("users")
export class User extends Model {
  @Column()
  @Length(1, 255)
  name: string;

  @Column()
  @IsEmail()
  @Length(1, 255)
  email: string;

  @Column({ type: "enum", enum: ["user", "admin"] })
  role: string;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];
}

import { User } from './User';
import { Entity, Column, ManyToOne } from "typeorm";
import Model from "./Model";

@Entity("posts")
export class Post extends Model {
  @Column()
  title: string;

  @Column()
  body: string;

  @ManyToOne(() => User, user => user.posts)
  user: User

}

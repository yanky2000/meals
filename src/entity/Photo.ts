import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Photo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    desc: string;

    // @Column()
    // lastName: string;

    // @Column()
    // age: number;

}

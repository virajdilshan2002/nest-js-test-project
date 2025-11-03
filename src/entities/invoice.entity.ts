import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    path: string;

    @Column()
    filename: string;

    @Column()
    type: string;
}
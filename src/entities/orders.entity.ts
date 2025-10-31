import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Item } from "./item.entity";

@Entity()
export class Orders {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderDate: Date;

    @Column()
    totalPrice: number;

    @ManyToOne(type => User, user => user.orders)
    user: User;

    @OneToMany(type => Item, item => item.order)
    items: Item[];
}
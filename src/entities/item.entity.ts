import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders.entity";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    itemName: string;

    @Column()
    qty: number;

    @Column()
    price: number;

    @ManyToOne(() => Orders, (order) => order.items)
    order: Orders;
}
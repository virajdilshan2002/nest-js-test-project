import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Orders } from './orders.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(type => Orders, order => order.user)
  orders: Orders[];
}

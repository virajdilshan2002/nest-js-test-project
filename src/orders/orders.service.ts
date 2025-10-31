import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDTO } from 'src/dto/order.dto';
import { Orders } from 'src/entities/orders.entity';
import { ItemService } from 'src/item/item.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
        private userService: UsersService,
        private itemService: ItemService
    ) {}

    async save(orderDto: OrderDTO): Promise<Orders> {
        // use promise resolve reject
        
        return new Promise(async (resolve, reject) => {
            try {
                this.userService.findById(orderDto.userId).then(user => {
                    if (!user) {
                        reject('User not found');
                    }
                    this.itemService.findByIds(orderDto.items).then(items => {
                        if (!items || items.length === 0) {
                            reject('Items not found');
                        }
                        const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
                        const order = {
                            orderDate: new Date(),
                            totalPrice: totalPrice,
                            user: user,
                            items: items
                        }
                        const savedOrder = this.ordersRepository.save(order);
                        resolve(savedOrder);
                    })
                })    
            } catch (error) {
                reject(error);
            }
        });
    }
}

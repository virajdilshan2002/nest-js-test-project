import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDTO } from 'src/dto/order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private orderService: OrdersService) { }

    @Post('create')
    async createOrder(@Body() orderDto: OrderDTO) {
        try {
            const savedOrder = await this.orderService.save(orderDto);
            return savedOrder;
        } catch (error) {
            console.error('Error creating order', { cause: error });
            return { error: 'Error creating order', details: error };
        }
    }
}

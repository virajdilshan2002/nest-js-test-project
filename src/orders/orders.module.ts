import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/entities/orders.entity';
import { UsersModule } from 'src/users/users.module';
import { ItemModule } from 'src/item/item.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders]),
    UsersModule,
    ItemModule  
  ],
  controllers: [OrdersController],
  exports: [OrdersService],
  providers: [OrdersService]
})
export class OrdersModule {}

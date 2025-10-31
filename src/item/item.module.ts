import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [ItemController],
  exports: [ItemService],
  providers: [ItemService]
})
export class ItemModule {}

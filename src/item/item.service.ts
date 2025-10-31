import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemDTO } from 'src/dto/item.dto';
import { Item } from 'src/entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item) private itemRepository: Repository<Item>
    ) {}

    async findAll(): Promise<Item[]> {
        return this.itemRepository.find();
    }

    async findByIds(ids: number[]): Promise<Item[]> {
        return this.itemRepository.findByIds(ids);
    }

    async save(itemDto: ItemDTO): Promise<Item> {
        const item = this.itemRepository.create(itemDto);
        return this.itemRepository.save(item);
    }

    async delete(id: number): Promise<boolean> {
        await this.itemRepository.delete(id);
        //check if the item still exists
        return await this.itemRepository.exists({ where: { id } });
    }
}

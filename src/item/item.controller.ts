import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemDTO } from 'src/dto/item.dto';

@Controller('item')
export class ItemController {
    constructor(private itemService: ItemService) {}

    @Post('save')
    saveItem(@Body() itemDto: ItemDTO) {
        return this.itemService.save(itemDto);
    }

    @Delete('delete/:id')
    async deleteItem(@Param('id') id: number) {
        const result = await this.itemService.delete(id);
        if (result) {
            return { result: result, message: 'Item still exists!' };
        } else {
            return { result: result, message: 'Item deleted successfully' };
        }
    }
}

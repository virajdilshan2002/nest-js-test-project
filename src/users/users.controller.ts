import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/decorator/public.decorator';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Public()
    @Post('register')
    register(@Body() userDto: Record<string, any>) {
        return this.userService.register(userDto);
    }
}

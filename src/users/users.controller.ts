import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/decorator/public.decorator';
import { UserDTO } from 'src/dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Public()
    @Post('register')
    register(@Body() userDto: UserDTO) {
        return this.userService.register(userDto);
    }
}

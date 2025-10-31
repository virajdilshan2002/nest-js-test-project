import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from 'src/dto/user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: number): Promise<User | any> {
    return this.usersRepository.findOneBy({ id });
  }

  async findOne(username: string): Promise<User | any> {
    return this.usersRepository.findOneBy({ username });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async register(userDto: UserDTO): Promise<User> {
    const user = this.usersRepository.create(userDto);
    await this.usersRepository.save(user);
    return user;
  }
}

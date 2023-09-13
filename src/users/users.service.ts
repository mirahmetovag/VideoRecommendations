import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
constructor(@InjectModel('user') private readonly userService: Model <any>){}
  async create({username, password}: CreateUserDto) {
    const user = await this.userService.create({username, password});
    return user;
  }

  async findOne(id: string) {
    const user = await this.userService.findById(id);
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.userService.findOne({username});
    return user;
  }
}

import { Inject, Injectable, ForbiddenException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { MailService } from 'src/mail/mail.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AddInterestDto } from './dto/add-interest.dto';

@Injectable()
export class AuthService {
  @Inject() private readonly jwtService:  JwtService
  @Inject() private readonly usersService: UsersService
  @Inject() private readonly mailService: MailService
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache){};
  async register({email, username, password}: RegisterAuthDto) {
    const user = await this.usersService.findByUsername(username);
    if (user) throw new ForbiddenException('Username already exists');
    const hashedPass = await bcrypt.hash(password, 10);

    const Otp = Math.floor(100000 + Math.random() * 900000);

    this.cacheManager.set(username, JSON.stringify({otp: Otp, password: hashedPass, count: 3}));

    const html = `<b>Code: ${Otp}</b>`
    this.mailService.sendMail(email, html);
    return {message: 'OK'}
  }

  async verify ({username, otp}: VerifyAuthDto) {
    const cache: string = await this.cacheManager.get(username);
    if (!cache) throw new ForbiddenException('Invalid code');
    const res = JSON.parse(cache);
    if(res.count == 0) throw new ForbiddenException('Invalid code')
    if (res.otp != otp) {
      this.cacheManager.set(username, JSON.stringify({otp: res.otp, password: res.password, count: res.count - 1}));
      throw new ForbiddenException('Invalid code');
    }
    const newUser = await this.usersService.create({
      username,
      password: res.password,
    });
    const token = await this.jwtService.signAsync({id: newUser._id});
    await this.cacheManager.del(username);
    return {message: 'You are registered', token: token}
  }

  async login({username, password}: LoginAuthDto) {
    const user = await this.usersService.findByUsername(username);
    if (!user) throw new ForbiddenException('Invalid username or password');


    return 'This action adds a new auth';
  }

  async addInterests(body: AddInterestDto, user: string) {
    const {interest} = body;
    const theUser = await this.usersService.findOne(user);

    theUser.interests.push(interest) 
    await theUser.save()
    return theUser.interests;
  }
}

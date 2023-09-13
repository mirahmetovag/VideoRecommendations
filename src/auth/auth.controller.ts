import { Controller, Post, Body} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { AddInterestDto } from './dto/add-interest.dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterAuthDto) {
    return this.authService.register(body);
  }

  @Post('verify')
  verify(@Body() body: VerifyAuthDto) {
    return this.authService.verify(body);
  }

  @Post('login')
  login(@Body() body: RegisterAuthDto) {
    return this.authService.login(body);
  }

  @Post('interest')
  interest(@Body() addInterestDto: AddInterestDto, @CurrentUser() user: any) {
      return this.authService.addInterests(addInterestDto, user);
    }
}

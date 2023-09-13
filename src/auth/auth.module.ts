import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';
import { MailModule } from 'src/mail/mail.module';

@Module({
    imports: [UsersModule, MailModule, JwtModule.register({
    secret: process.env.JWT_KEY,
    signOptions: {expiresIn: '24h'},
    global: true
  }),
CacheModule.register({ttl: 120000})],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

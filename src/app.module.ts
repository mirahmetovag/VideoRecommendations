import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { MongooseModule} from '@nestjs/mongoose'
import { MailModule } from './mail/mail.module';
import { FileModule } from './file/file.module';
import { VideoModule } from './video/video.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
  }), AuthModule, UsersModule, SharedModule, MongooseModule.forRoot(process.env.DB_URL), MailModule, FileModule, VideoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

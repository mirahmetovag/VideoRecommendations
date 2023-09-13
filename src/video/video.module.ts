import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoSchema } from 'src/shared/models/Video.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ schema: VideoSchema, name: 'video'}]), UsersModule],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}

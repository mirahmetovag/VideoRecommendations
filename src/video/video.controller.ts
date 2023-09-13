import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist/decorators';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('video')
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  create(@Body() body: CreateVideoDto, @CurrentUser() user: any) {
    return this.videoService.create(body, user);
  }

  @Get()
  getRecommended(@CurrentUser() user: any) {
    return this.videoService.findAll(user);
  }

  @Get(':id')
  getOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.videoService.getOne(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.videoService.remove(id, user);
  }
}

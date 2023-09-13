import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreateVideoDto } from './dto/create-video.dto';

@Injectable()
export class VideoService {
  constructor(@InjectModel('video') private readonly videoService: Model <any>){}
  @Inject() private readonly usersService: UsersService
  async create({title, topic, videoName}: CreateVideoDto, user: string) {
    const topics = [topic];
    const data = await this.videoService.create({title, topics, videoName, userId: user});
    return {message: 'Success', data}
  }

  async findAll(user: string) {
    const videos = await this.videoService.find();
    const theUser = await this.usersService.findOne(user);
    const recommendedVideos = videos.filter(video => theUser.watchedVideos._id != video._id && theUser.interests == video.topic);

    return recommendedVideos;
  }

  async getOne(id: string, user: string) {
    const video = await this.videoService.findById(id);
    if(!video) throw new ForbiddenException('Video was not found');

    const theUser = await this.usersService.findOne(user);
    theUser.watchedVideos.push(video._id);

    for (let i = 0; i < video.topics.length; i++) {
      if (!theUser.interests.includes(video.topics[i])) {
        theUser.possibleInterests.push({topic: video.topics[i], viewCount: 1})
      } else {
        const topic = await theUser.interests.find((topic: string) => topic = video.topics[i]);
        topic.viewCount += 1;
      }
    }

    const newInterests = theUser.possibleInterests.filter(views => views.viewsCount >= 10);
    theUser.interests.concat(newInterests);

    theUser.possibleInterests.filter(views => views.viewsCount <= 10);
    await theUser.save();
    return video;
  }

  async remove(id: string, user: string) {
    const video = await this.videoService.findById(id);
    if(!video) throw new ForbiddenException('Video was not found');

    if(video.userId === user) throw new ForbiddenException('You are not allowed to delete this video')

    const data = await this.videoService.deleteOne(video);
    if(data.deletedCount == 0) throw new ForbiddenException('Video was not deleted');
    return {message: 'Successfully deleted'};
  }
}

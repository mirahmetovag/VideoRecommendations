import { IsNotEmpty, IsString } from "class-validator";

export class CreateVideoDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @IsString()
    topic: string;
    
    @IsNotEmpty()
    @IsString()
    videoName: string;
}

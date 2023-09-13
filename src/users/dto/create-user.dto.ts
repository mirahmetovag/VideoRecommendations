import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MaxLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @ApiProperty({ description: 'username', type: 'string', example: '0000' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'password', type: 'string', example: '0000' })
  password: string
}
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class VerifyAuthDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsNumber()
    @IsNotEmpty()
    otp: number;
}
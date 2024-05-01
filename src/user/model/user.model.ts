import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, IsInt, Min } from "class-validator"

export class User {
    id: number;
    email: string;
}

export class UserCreation {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
};

export class UserIdParam {
    @IsInt()
    @Min(0)
    @Type(() => Number)
    userId: number;
}

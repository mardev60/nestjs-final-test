import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService : UserService) {}

    @Post()
    async createUser(@Res() res: Response, @Body('email') email: string): Promise<any> {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(HttpStatus.BAD_REQUEST).send();
        }

        try {
            const existingUser = await this.userService.getUser(email);
            if (existingUser) {
                res.status(HttpStatus.CONFLICT).send();
            }

            await this.userService.addUser(email);

            res.status(HttpStatus.CREATED).send();
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }
}

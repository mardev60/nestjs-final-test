import { Body, ConflictException, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService : UserService) {}

    /*
     * Création d'un utilisateur en fournissant l'adresse email
     */
    @Post()
    async createUser(@Res() res: Response, @Body('email') email: string): Promise<any> {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(HttpStatus.BAD_REQUEST).send();
        }

        try {
            await this.userService.addUser(email);
            return res.status(HttpStatus.CREATED).send();
        } catch (error) {
            if (error instanceof ConflictException) {
                return res.status(HttpStatus.CONFLICT).send();
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }
}

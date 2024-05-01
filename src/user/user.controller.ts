import { Body, ConflictException, Controller, HttpStatus, Post, Res, ValidationPipe, UsePipes } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { UserCreation } from './model/user.model';

@Controller()
export class UserController {
    constructor(private readonly userService : UserService) {}

    /*
     * Création d'un utilisateur en fournissant l'adresse email
     */
    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async createUser(@Res() res: Response, @Body() user : UserCreation): Promise<any> {
        try {
            await this.userService.addUser(user.email);
            return res.status(HttpStatus.CREATED).send();
        } catch (error) {
            if (error instanceof ConflictException) {
                return res.status(HttpStatus.CONFLICT).send();
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }
}

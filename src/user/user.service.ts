import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../infrastructure/database/database.service';
import { User } from './model/user.model';

@Injectable()
export class UserService {
    constructor(private readonly db : DatabaseService) {}

    /*
     * Création d'un utilisateur dans la BDD
     */
    async addUser(email: string): Promise<void> {
        const existingUser = await this.getUser(email);
        if (existingUser) {
            throw new ConflictException();
        }
        await this.db.user.create({
            data : {email : email}
        })
    }

    /*
     * Obtention d'un utilisateur par adresse mail
     */
    async getUser(email: string): Promise<User> {
        let user = await this.db.user.findFirst({
            where : {email : email}
        });
        return user;
    }

    /*
     * Suppression des données (utilisée par les tests)
     */
    async resetData(): Promise<void> {
        await this.db.user.deleteMany();
    }
}

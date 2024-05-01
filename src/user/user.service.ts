import { Injectable, NotImplementedException } from '@nestjs/common';
import { DatabaseService } from '../infrastructure/database/database.service';

@Injectable()
export class UserService {
    constructor(private readonly db : DatabaseService) {}

    async addUser(email: string): Promise<void> {
        await this.db.user.create({
            data : {email : email}
        })
    }

    async getUser(email: string): Promise<unknown> {
        let user = await this.db.user.findFirst({
            where : {email : email}
        });
        return user;
    }

    async resetData(): Promise<void> {
        await this.db.user.deleteMany();
    }
}

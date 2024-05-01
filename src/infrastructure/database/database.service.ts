import { Injectable } from '@nestjs/common';
import { ConfigurationService } from '../configuration/configuration.service';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient {
    constructor(private configService: ConfigurationService) {
        const databaseConfig = configService.databaseConfig;
        super({
            datasources: {
                db: {
                    url: `postgresql://postgres:postgres@localhost:${databaseConfig.DATABASE_PORT}/${databaseConfig.DATABASE_NAME}?schema=public`,
                },
            },
        });
    }

}
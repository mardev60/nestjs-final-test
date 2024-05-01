import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { DatabaseModule } from '../infrastructure/database/database.module';
import { TaskController } from './task.controller';

@Module({
    controllers : [TaskController],
    imports : [DatabaseModule],
    providers : [TaskService]
})
export class TaskModule {}

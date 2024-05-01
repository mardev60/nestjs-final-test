import { Injectable, NotImplementedException } from '@nestjs/common';
import { DatabaseService } from '../infrastructure/database/database.service';

@Injectable()
export class TaskService {
    constructor(private readonly db : DatabaseService) {}

    async addTask(name: string, userId: number, priority: number): Promise<void> {
        await this.db.task.create({
            data : {
                name : name,
                userid : userId,
                priority : priority
            }
        })
    }

    async getTaskByName(name: string): Promise<unknown> {
        let task = await this.db.task.findFirst({where : {name : name}});
        return task;
    }

    async getUserTasks(userId: number): Promise<unknown[]> {
        let tasks = await this.db.task.findMany({where : {userid : userId}});
        return tasks;
    }

    async resetData(): Promise<void> {
        await this.db.task.deleteMany()
    }
}

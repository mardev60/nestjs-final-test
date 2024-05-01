import { Injectable, NotImplementedException } from '@nestjs/common';
import { DatabaseService } from '../infrastructure/database/database.service';

@Injectable()
export class TaskService {
    constructor(private readonly db : DatabaseService) {}

    /*
     * Création d'une tâche dans la BDD
     */
    async addTask(name: string, userId: number, priority: number): Promise<void> {
        await this.db.task.create({
            data : {
                name : name,
                userid : userId,
                priority : priority
            }
        })
    }

    /*
     * Obtention d'une tâche par son nom
     */
    async getTaskByName(name: string): Promise<unknown> {
        let task = await this.db.task.findFirst({where : {name : name}});
        return task;
    }

    /*
     * Obtention de la liste des tâches d'un utilisateur
     */
    async getUserTasks(userId: number): Promise<unknown[]> {
        let tasks = await this.db.task.findMany({where : {userid : userId}});
        return tasks;
    }

    /*
     * Suppression des données (utilisée par les tests)
     */
    async resetData(): Promise<void> {
        await this.db.task.deleteMany()
    }
}

import { Body, Controller, Get, Param, Post, Res, HttpStatus, HttpException } from '@nestjs/common';
import { TaskService } from './task.service';
import { Response } from 'express';

@Controller()
export class TaskController {
    constructor(private readonly taskService : TaskService) {}

    /*
     * Obtention des tâches d'un utilisateur avec son userId
     */
    @Get('/user/:userId')
    async getUserTasks(@Param('userId') userId: string, @Res() res): Promise<void> {
        const numericUserId = parseInt(userId, 10);
        if (!userId || userId.trim() === '' || isNaN(numericUserId) || numericUserId < 0) {
            res.status(HttpStatus.BAD_REQUEST).send();
            return;
            
        }
        const tasks = await this.taskService.getUserTasks(numericUserId);
        res.status(HttpStatus.OK).json(tasks);
    }

    /*
     * Création d'une nouvelle tâche en fournissant ses infromations (nom, userId et priorité)
     */
    @Post()
    async addTask(@Body() taskData: { name: string; userId: string; priority: string }, @Res() res: Response): Promise<void> {
        const { name, userId, priority } = taskData;

        const numericUserId = parseInt(userId, 10);
        const numericPriotity = parseInt(priority, 10);

        if (!name || !userId ||  isNaN(numericPriotity) || numericPriotity <= 0 || isNaN(numericUserId)) {
            res.status(HttpStatus.BAD_REQUEST).send();
        }

        try {
            await this.taskService.addTask(name, numericUserId, numericPriotity);
            res.status(HttpStatus.CREATED).send();
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }
}

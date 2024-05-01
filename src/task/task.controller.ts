import { Body, Controller, Get, Param, Post, Res, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { Response } from 'express';
import { TaskCreation } from './model/task.model';
import { UserIdParam } from '../user/model/user.model';

@Controller()
export class TaskController {
    constructor(private readonly taskService : TaskService) {}

    /*
     * Obtention des tâches d'un utilisateur avec son userId
     */
    @Get('/user/:userId')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getUserTasks(@Param() userIdParam: UserIdParam, @Res() res: Response): Promise<any> {
        try {
            const tasks = await this.taskService.getUserTasks(userIdParam.userId);
            return res.status(HttpStatus.OK).json(tasks);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }

    /*
     * Création d'une nouvelle tâche en fournissant ses infromations (nom, userId et priorité)
     */
    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async addTask(@Body() taskData: TaskCreation, @Res() res: Response): Promise<any> {
        try {
            await this.taskService.addTask(taskData.name, taskData.userId, taskData.priority);
            return res.status(HttpStatus.CREATED).send();
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }
}

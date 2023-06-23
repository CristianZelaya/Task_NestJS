import { Body, Controller, Get, Post, Param, Patch, Put} from '@nestjs/common';
import { TasksService } from './tasks.service'
import { CreateTaskDto, IdDto, UpdateTaskDto} from './dto/task.dto'

@Controller('tasks')
export class TasksController {

    constructor( private tasksService: TasksService) {
    }

    @Get()
    getAllTasks(){

        return this.tasksService.getAllTasks();

    }

    @Get(':id')
    getTaskById(@Param()  requestId:IdDto){
    
        return this.tasksService.getTaskById(requestId);

    }

    @Post()
    createTask(@Body() newTask:CreateTaskDto){

        return this.tasksService.createTask(newTask)

    }

    @Patch(':id')
    deleteTask(@Param() requestId:IdDto){

        return this.tasksService.deleteTask( requestId )

    }

    @Patch('update-task/:id')
    updateTask(@Param() requestId:IdDto, @Body() updateTask:UpdateTaskDto){

        return this.tasksService.updateTask(requestId, updateTask)

    }

}

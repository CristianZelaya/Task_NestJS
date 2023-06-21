import { Body, Controller, Get, Post, Param, Patch, Put} from '@nestjs/common';
import { TasksService } from './tasks.service'
import { CreateTaskDto, UpdateTaskDto} from './dto/task.dto'

@Controller('tasks')
export class TasksController {

    constructor( private tasksService: TasksService) {

    }

    @Get()
    getAllTasks(){

        return this.tasksService.getAllTasks();

    }

    @Get(':id')
    getTaskById(@Param('id')  id:string){
    
        return this.tasksService.getTaskById(id);

    }

    @Post()
    createTask(@Body() newTask:CreateTaskDto){

        return this.tasksService.createTask(newTask)

    }

    @Patch(':id')
    deleteTask(@Param('id') id:string){

        console.log(id);

        return this.tasksService.deleteTask( id )

    }

    @Patch('update-task/:id')
    updateTask(@Param('id') id:string, @Body() updateTask:UpdateTaskDto){

        return this.tasksService.updateTask(id, updateTask)

    }

}

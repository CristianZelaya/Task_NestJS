import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.entity';
import { v4 } from 'uuid'
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [{
        id: '1',
        title: 'first task',
        description: 'some task',
        statusTask: TaskStatus.PENDING,
        status: true
    }]

    getAllTasks() {

        let response = {}

        if (this.tasks.length >= 1 ) {

            let total = this.tasks.length
            let tasks = this.tasks

            response = {
                total,
                tasks               
            }
            
        } else {

            response = {

                msg: 'No hay tareas'

            }

        }

        return response
        
    }

    getTaskById(id:string) {

        const task = this.tasks.find( task => task.id === id && task.status === true )

        let response = {}

        if ( task ){

            response = task
            
        } else {

            response = {
                msg: `No hay tareas con el id ${id}`,
                task
            }

        }

        return response

    }

    createTask(newTask:CreateTaskDto) {

        const task = {
            id: v4(),
            title: newTask.title,
            description: newTask.description,
            statusTask: TaskStatus.PENDING,
            status: true
        }

        this.tasks.push(task);

        let response = {
            msg: 'Se creo correctamente',
            task
        }

        return response;

    }

    updateTask(id:string, updateFields:UpdateTaskDto):Task {

        updateFields
        const task = this.getTaskById(id)
        let response = {}

        if ( task ) {

            const update = Object.assign(task, updateFields)
            this.tasks = this.tasks.map((task) => (task.id === id ? update : task) as Task )

            response = {
                msg: 'Se actualizo correctamente',
                task: update
            }

        } else {

            response = {
                msg: `No se encontro tarea con el id ${id}`
            }

        }

        return response as Task

    }

    deleteTask(id:string) {
        
        let task = this.tasks.filter( task => task.id === id && task.status === true)
        let response = {}

        if ( task.length == 1 ) {

            task[0].status = false

            response = {
                msg: 'Se elimino correctamente',
                task
            }

        } else {

            response = { 
                msg: `No se encontro tarea con el id: ${id}`
            }

        }

        return response
    }
    
}
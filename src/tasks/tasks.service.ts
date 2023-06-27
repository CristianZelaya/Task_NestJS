import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
//import { Task, TaskStatus } from './tasks.entity';
import { v4 } from 'uuid'
import { CreateTaskDto, IdDto, UpdateTaskDto } from './dto/task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schema/task.schema';
import { Model } from 'mongoose';
import e from 'express';

@Injectable()
export class TasksService {

    constructor(@InjectModel(Task.name) private taskModule:Model<TaskDocument>){

    }

    // private tasks: Task[] = [{
    //     id: '1',
    //     title: 'first task',
    //     description: 'some task',
    //     statusTask: TaskStatus.PENDING,
    //     status: true
    // }]

    async getAllTasks() {

        try {
            
            const tasks = await this.taskModule.find()
            return tasks

        } catch (error) {

            if( error.status != 500 ) throw error

            throw new InternalServerErrorException(error)
            
        }


        // let response = {}

        // if (this.tasks.length >= 1 ) {

        //     let total = this.tasks.length
        //     let tasks = this.tasks

        //     response = {
        //         total,
        //         tasks               
        //     }
            
        // } else {

        //     response = {

        //         msg: 'No hay tareas'

        //     }

        // }

        // return response
        
    }

    async getTaskById(requestId:IdDto) {

        try {

            const task = await this.taskModule.findById({_id: requestId.id, status: true})

            if (!task) {

                throw new NotFoundException(`Task with id ${requestId.id} not found`)

            }

            return task
            
        } catch (error) {

            if( error.status != 500 ) throw error

            throw new InternalServerErrorException(error)
            
        }

        // const task = this.tasks.find( task => task.id === id && task.status === true )

        // let response = {
        //     msg: "",
        //     task: {},
        //     cod: 400
        // }

        // if ( task ){

        //     response = {
        //         msg: `Se encontro la tarea con el id ${id}`,
        //         task,
        //         cod: 200
        //     }
            
        // } else {

        //     response = {
        //         msg: `No hay tareas con el id ${id}`,
        //         task: {},
        //         cod: 400
        //     }

        // }

        // return response

    }

    async createTask(newTask:CreateTaskDto) {

        try {

            const task = await this.taskModule.create(newTask)
    
            return task
            
        } catch (error) {

            if( error.status != 500 ) throw error

            throw new InternalServerErrorException(error)
            
        }


        // const task = {
        //     id: v4(),
        //     title: newTask.title,
        //     description: newTask.description,
        //     statusTask: TaskStatus.PENDING,
        //     status: true
        // }

        // this.tasks.push(task);

        // let response = {
        //     msg: 'Se creo correctamente',
        //     task
        // }

        // return response;

    }

    async updateTask(requestId:IdDto, updateFields:UpdateTaskDto) {

        try {
            
            const { title, description, statusTask} = updateFields
    
            const task = await this.taskModule.findByIdAndUpdate({_id: requestId.id, status: true}, {title, description, statusTask}, {new: true})
    
            if (!task || !task.status){
    
                throw new NotFoundException(`Task with id ${requestId.id} not found`)
    
            }
    
            //const update = await this.taskModule.findByIdAndUpdate({_id: requestId.id, status: true}, {title, description, statusTask}, {new: true})
            return task

        } catch (error) {

            if( error.status != 500 ) throw error

            throw new InternalServerErrorException(error)
            
        }


        // updateFields
        // const task = this.getTaskById(id)
        // let response = {}

        // if ( task && task.cod == 200 ) {

        //     const update = Object.assign(task.task, updateFields)
        //     this.tasks = this.tasks.map((task) => (task.id === id ? update : task) as Task )

        //     response = {
        //         msg: 'Se actualizo correctamente',
        //         task: update
        //     }

        // } else {

        //     response = {
        //         msg: `No se encontro tarea con el id ${id}`
        //     }

        // }

        // return response as Task

    }

    async deleteTask(requestId:IdDto) {

        try {
            
            const task = await this.taskModule.findByIdAndUpdate({_id: requestId.id, status: true}, {status: false}, {new: true})

            if ( !task || !task.status ){

                throw new NotFoundException(`Task with id ${requestId.id} not found`)

            }
            
            return task;

        } catch (error) {

            if( error.status != 500 ) throw error

            throw new InternalServerErrorException(error)
            
        }

        
    //     let task = this.tasks.filter( task => task.id === id && task.status === true)
    //     let response = {}

    //     if ( task.length == 1 ) {

    //         task[0].status = false

    //         response = {
    //             msg: 'Se elimino correctamente',
    //             task
    //         }

    //     } else {

    //         response = { 
    //             msg: `No se encontro tarea con el id: ${id}`
    //         }

    //     }

    //     return response
    }
    
}

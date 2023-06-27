import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum TaskStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export type TaskDocument = Task & Document;

@Schema({timestamps: true})
export class Task{
    
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: TaskStatus.PENDING})
  statusTask: string;

  @Prop({ default: true })
  status: boolean

}

export const TaskSchema = SchemaFactory.createForClass(Task);

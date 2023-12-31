import { TaskStatus  } from "../tasks.entity"
import { IsNotEmpty, IsString, MinLength, IsOptional, IsIn, IsMongoId} from "class-validator"

export class IdDto{
    @IsMongoId()
    @IsNotEmpty()
    @IsString()
    id: string
}

export class CreateTaskDto{

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    title: string

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    description: string

}

export class UpdateTaskDto{

    @IsString()
    @IsOptional()
    title?: string

    @IsString()
    @IsOptional()
    description?: string

    @IsString()
    @IsOptional()
    @IsIn([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    statusTask?: TaskStatus

}
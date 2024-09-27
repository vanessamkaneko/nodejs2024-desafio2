import { Injectable } from '@nestjs/common';
import { ITaskMongoDbRepository } from './ITask-mongodb.repository';
import { Task } from 'src/core/task/entity/task.entity';
import { TaskModel } from 'src/infrastructure/persistence/bds/mongodb/schema/taskModel';
import { ListTaskDto } from 'src/core/task/dto/list-task.dto';
import { UpdateTaskDto } from 'src/core/task/dto/update-task.dto';
import { UpdateCompleteTaskDto } from 'src/core/task/dto/update-complete-task.dto';

@Injectable()
export class TaskMongoDbRepository implements ITaskMongoDbRepository {
  async create(task: Task): Promise<Task> {
    const taskCreated = await TaskModel.create({ ...task });

    await taskCreated.save();

    return taskCreated;
  }

  async find(query: ListTaskDto): Promise<Task[]> {
    const listedTasks = await TaskModel.find(query);

    return listedTasks; /* retorna as tasks de acordo com as queries, se não houver nenhuma query, retornará todas as tasks */
  }

  async findById(id: string): Promise<Task> {
    const task = await TaskModel.findById(id);

    return task;
  }

  async update(id: string, payload: UpdateTaskDto): Promise<Task> {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      {
        title: payload.title,
        description: payload.description,
      },
      { new: true },
    );

    return updatedTask;
  }

  async delete(id: string): Promise<void> {
    await TaskModel.deleteOne({ _id: id });
  }

  async markAsComplete(
    id: string,
    payload: UpdateCompleteTaskDto,
  ): Promise<Task> {
    const markTaskAsComplete = await TaskModel.findByIdAndUpdate(
      id,
      { completed_at: payload.completed_at },
      { new: true },
    );

    return markTaskAsComplete;
  }
}

import { Task } from 'src/core/task/entity/task.entity';
import { ITaskGateway } from './ITaskGateway';
import { Inject } from '@nestjs/common';
import { ITaskMongoDbRepository } from 'src/infrastructure/persistence/repositories/task/mongodb/ITask-mongodb.repository';
import { ListTaskDto } from 'src/core/task/dto/list-task.dto';
import { UpdateTaskDto } from 'src/core/task/dto/update-task.dto';
import { UpdateCompleteTaskDto } from 'src/core/task/dto/update-complete-task.dto';

export class TaskGateway implements ITaskGateway {
  constructor(
    @Inject(ITaskMongoDbRepository)
    private taskRepository: ITaskMongoDbRepository,
  ) {}

  async createTask(task: Task): Promise<Task> {
    const createTask = await this.taskRepository.create(task);

    return createTask;
  }

  async listTasks(query: ListTaskDto): Promise<Task[]> {
    const listTasks = await this.taskRepository.find(query);

    return listTasks;
  }

  async findTaskById(id: string): Promise<Task | null> {
    const task = await this.taskRepository.findById(id);

    return task;
  }

  async updateTask(id: string, payload: UpdateTaskDto): Promise<Task> {
    const updatedTask = await this.taskRepository.update(id, payload);

    return updatedTask;
  }

  async deleteTask(id: string): Promise<void> {
    const deletedTask = this.taskRepository.delete(id);

    return deletedTask;
  }

  async updateCompleteTask(
    id: string,
    payload: UpdateCompleteTaskDto,
  ): Promise<Task> {
    const markTaskAsComplete = this.taskRepository.markAsComplete(id, payload);

    return markTaskAsComplete;
  }
}

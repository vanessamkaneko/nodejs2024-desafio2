import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ITaskGateway } from 'src/application/operation/gateway/ITaskGateway';
import { UpdateTaskDto } from 'src/core/task/dto/update-task.dto';
import { Task } from 'src/core/task/entity/task.entity';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject(ITaskGateway)
    private taskGateway: ITaskGateway,
  ) {}

  async execute(id: string, payload: UpdateTaskDto): Promise<Task> {
    const task = await this.taskGateway.findTaskById(id);

    if (!task) {
      throw new BadRequestException('Task not found!');
    }

    const updateTask = await this.taskGateway.updateTask(id, payload);

    return updateTask;
  }
}

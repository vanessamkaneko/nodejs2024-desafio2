import { BadRequestException, Inject } from '@nestjs/common';
import { ITaskGateway } from 'src/application/operation/gateway/ITaskGateway';
import { UpdateCompleteTaskDto } from 'src/core/task/dto/update-complete-task.dto';
import { Task } from 'src/core/task/entity/task.entity';

export class UpdateCompleteTaskUseCase {
  constructor(
    @Inject(ITaskGateway)
    private taskGateway: ITaskGateway,
  ) {}

  async execute(id: string, payload: UpdateCompleteTaskDto): Promise<Task> {
    const task = await this.taskGateway.findTaskById(id);

    if (!task) {
      throw new BadRequestException('Task not found!');
    }

    if (task.completed_at === null) {
      const markTaskAsComplete = await this.taskGateway.updateCompleteTask(
        id,
        payload,
      );
      return markTaskAsComplete;
    } else {
      throw new BadRequestException('Task is already completed!');
    }
  }
}

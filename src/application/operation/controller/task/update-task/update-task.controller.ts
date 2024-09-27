import { Inject } from '@nestjs/common';
import { UpdateTaskDto } from 'src/core/task/dto/update-task.dto';
import { Task } from 'src/core/task/entity/task.entity';
import { UpdateTaskUseCase } from 'src/core/task/usecase/task/update-task/update-task.usecase';

export class UpdateTaskController {
  constructor(
    @Inject(UpdateTaskUseCase)
    private updateTaskUseCase: UpdateTaskUseCase,
  ) {}

  async handle(id: string, payload: UpdateTaskDto): Promise<Task> {
    const updateTask = await this.updateTaskUseCase.execute(id, payload);

    return updateTask;
  }
}

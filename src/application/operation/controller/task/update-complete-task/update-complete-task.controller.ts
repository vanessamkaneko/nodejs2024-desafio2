import { Inject } from '@nestjs/common';
import { UpdateCompleteTaskDto } from 'src/core/task/dto/update-complete-task.dto';
import { Task } from 'src/core/task/entity/task.entity';
import { UpdateCompleteTaskUseCase } from 'src/core/task/usecase/task/update-complete-task/update-complete-task.usecase';

export class UpdateCompleteTaskController {
  constructor(
    @Inject(UpdateCompleteTaskUseCase)
    private updateCompleteTaskUseCase: UpdateCompleteTaskUseCase,
  ) {}

  async handle(id: string, payload: UpdateCompleteTaskDto): Promise<Task> {
    const markTaskAsComplete = await this.updateCompleteTaskUseCase.execute(
      id,
      payload,
    );
    return markTaskAsComplete;
  }
}

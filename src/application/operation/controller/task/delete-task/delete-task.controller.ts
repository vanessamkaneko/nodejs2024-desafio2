import { Inject } from '@nestjs/common';
import { DeleteTaskUseCase } from 'src/core/task/usecase/task/delete-task/delete-task.usecase';

export class DeleteTaskController {
  constructor(
    @Inject(DeleteTaskUseCase)
    private deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  async handle(id: string): Promise<void> {
    const deleteTask = this.deleteTaskUseCase.execute(id);

    return deleteTask;
  }
}

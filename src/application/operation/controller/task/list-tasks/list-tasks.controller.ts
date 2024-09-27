import { Inject } from '@nestjs/common';
import { ListTaskDto } from 'src/core/task/dto/list-task.dto';
import { Task } from 'src/core/task/entity/task.entity';
import { ListTasksUseCase } from 'src/core/task/usecase/task/list-tasks/list-tasks.usecase';

export class ListTasksController {
  constructor(
    @Inject(ListTasksUseCase)
    private listTasksUseCase: ListTasksUseCase,
  ) {}

  async handle(query: ListTaskDto): Promise<Task[]> {
    const listTasks = await this.listTasksUseCase.execute(query);

    return listTasks;
  }
}

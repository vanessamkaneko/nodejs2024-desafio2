import { Inject, Injectable } from '@nestjs/common';
import { ITaskGateway } from 'src/application/operation/gateway/ITaskGateway';
import { ListTaskDto } from 'src/core/task/dto/list-task.dto';
import { Task } from 'src/core/task/entity/task.entity';

@Injectable()
export class ListTasksUseCase {
  constructor(
    @Inject(ITaskGateway)
    private taskGateway: ITaskGateway,
  ) {}

  async execute(query: ListTaskDto): Promise<Task[]> {
    const queryConditions: any = {};

    if (query.description) {
      queryConditions.description = query.description;
    }

    if (query.title) {
      queryConditions.title = query.title;
    }

    const listedTask = await this.taskGateway.listTasks(queryConditions);

    return listedTask;
  }
}

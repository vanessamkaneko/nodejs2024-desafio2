import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ITaskGateway } from 'src/application/operation/gateway/ITaskGateway';

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    @Inject(ITaskGateway)
    private taskGateway: ITaskGateway,
  ) {}

  async execute(id: string): Promise<void> {
    const task = await this.taskGateway.findTaskById(id);

    if (!task) {
      throw new BadRequestException('Task not found!');
    }

    const deleteTask = this.taskGateway.deleteTask(id);

    return deleteTask;
  }
}

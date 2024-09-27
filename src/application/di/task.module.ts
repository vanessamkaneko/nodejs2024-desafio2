import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { ITaskGateway } from '../operation/gateway/ITaskGateway';
import { ITaskMongoDbRepository } from 'src/infrastructure/persistence/repositories/task/mongodb/ITask-mongodb.repository';
import { TaskGateway } from '../operation/gateway/TaskGateway';
import { CreateTaskUseCase } from 'src/core/task/usecase/task/create-task/create-task.usecase';
import { CreateTaskController } from '../operation/controller/task/create-task/create-task.controller';
import { TaskControllerRoute } from '../api/http-rest/routes/task.route';
import { TaskMongoDbRepository } from 'src/infrastructure/persistence/repositories/task/mongodb/Task-mongodb.repository';
import { ListTasksUseCase } from 'src/core/task/usecase/task/list-tasks/list-tasks.usecase';
import { ListTasksController } from '../operation/controller/task/list-tasks/list-tasks.controller';
import { UpdateTaskUseCase } from 'src/core/task/usecase/task/update-task/update-task.usecase';
import { UpdateTaskController } from '../operation/controller/task/update-task/update-task.controller';
import { DeleteTaskUseCase } from 'src/core/task/usecase/task/delete-task/delete-task.usecase';
import { DeleteTaskController } from '../operation/controller/task/delete-task/delete-task.controller';
import { UpdateCompleteTaskUseCase } from 'src/core/task/usecase/task/update-complete-task/update-complete-task.usecase';
import { UpdateCompleteTaskController } from '../operation/controller/task/update-complete-task/update-complete-task.controller';

const persistenceProviders: Provider[] = [
  {
    provide: ITaskMongoDbRepository,
    useFactory: () => new TaskMongoDbRepository(),
    inject: [],
  },
  {
    provide: ITaskGateway,
    useFactory: (taskMongoDbRepository: ITaskMongoDbRepository) =>
      new TaskGateway(taskMongoDbRepository),
    inject: [ITaskMongoDbRepository],
  },
];

const useCaseProviders: Provider[] = [
  {
    provide: CreateTaskUseCase,
    useFactory: (taskGateway: ITaskGateway) =>
      new CreateTaskUseCase(taskGateway),
    inject: [ITaskGateway],
  },
  {
    provide: ListTasksUseCase,
    useFactory: (taskGateway: ITaskGateway) =>
      new ListTasksUseCase(taskGateway),
    inject: [ITaskGateway],
  },
  {
    provide: UpdateTaskUseCase,
    useFactory: (taskGateway: ITaskGateway) =>
      new UpdateTaskUseCase(taskGateway),
    inject: [ITaskGateway],
  },
  {
    provide: DeleteTaskUseCase,
    useFactory: (taskGateway: ITaskGateway) =>
      new DeleteTaskUseCase(taskGateway),
    inject: [ITaskGateway],
  },
  {
    provide: UpdateCompleteTaskUseCase,
    useFactory: (taskGateway: ITaskGateway) =>
      new UpdateCompleteTaskUseCase(taskGateway),
    inject: [ITaskGateway],
  },
];

const controllerProviders: Provider[] = [
  {
    provide: CreateTaskController,
    useFactory: (createTaskUseCase: CreateTaskUseCase) =>
      new CreateTaskController(createTaskUseCase),
    inject: [CreateTaskUseCase],
  },
  {
    provide: ListTasksController,
    useFactory: (listTasksUseCase: ListTasksUseCase) =>
      new ListTasksController(listTasksUseCase),
    inject: [ListTasksUseCase],
  },
  {
    provide: UpdateTaskController,
    useFactory: (updateTaskUseCase: UpdateTaskUseCase) =>
      new UpdateTaskController(updateTaskUseCase),
    inject: [UpdateTaskUseCase],
  },
  {
    provide: DeleteTaskController,
    useFactory: (deleteTaskUseCase: DeleteTaskUseCase) =>
      new DeleteTaskController(deleteTaskUseCase),
    inject: [DeleteTaskUseCase],
  },
  {
    provide: UpdateCompleteTaskController,
    useFactory: (updateCompleteTaskUseCase: UpdateCompleteTaskUseCase) =>
      new UpdateCompleteTaskController(updateCompleteTaskUseCase),
    inject: [UpdateCompleteTaskUseCase],
  },
];

@Module({
  imports: [],
  controllers: [TaskControllerRoute],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...controllerProviders,
  ],
})
export class TaskModule {}

import { ListTaskDto } from 'src/core/task/dto/list-task.dto';
import { UpdateCompleteTaskDto } from 'src/core/task/dto/update-complete-task.dto';
import { UpdateTaskDto } from 'src/core/task/dto/update-task.dto';
import { Task } from 'src/core/task/entity/task.entity';

export interface ITaskGateway {
  createTask(task: Task): Promise<Task>;
  listTasks(query: ListTaskDto): Promise<Task[]>;
  findTaskById(id: string): Promise<Task>;
  updateTask(id: string, payload: UpdateTaskDto): Promise<Task>;
  deleteTask(id: string): Promise<void>;
  updateCompleteTask(id: string, payload: UpdateCompleteTaskDto): Promise<Task>;
}

export const ITaskGateway = Symbol('ITaskGateway');

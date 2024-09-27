import { CreateTaskDto } from '../dto/create-task.dto';

export class Task {
  title: string;

  description: string;

  completed_at: Date | null;

  created_at: Date;

  updated_at: Date;

  private constructor(payload: CreateTaskDto) {
    this.title = payload.title;
    this.description = payload.description;
    this.completed_at = null;
    this.updated_at = new Date();
  }

  public static new(payload: CreateTaskDto) {
    const task = new Task(payload);
    return task;
  }
}

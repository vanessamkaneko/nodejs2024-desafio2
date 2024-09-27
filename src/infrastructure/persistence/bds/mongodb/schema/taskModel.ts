import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { Task as TaskEntity } from 'src/core/task/entity/task.entity';

export const TaskSchema = new Schema<TaskEntity>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed_at: { type: Date },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
});

export const TaskModel = mongoose.model('Task', TaskSchema);

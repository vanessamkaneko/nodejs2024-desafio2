import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { Meal as MealEntity } from 'src/core/meal/entity/meal.entity';

export const MealSchema = new Schema<MealEntity>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  on_diet: { type: Boolean, required: true },
  date: { type: Date, default: Date.now },
});

export const MealModel = mongoose.model('Meal', MealSchema);

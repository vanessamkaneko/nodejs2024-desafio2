import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { User as UserEntity } from 'src/core/user/entity/user.entity';

export const UserSchema = new Schema<UserEntity>({
  name: { type: String, required: true },
  email: { type: String, required: true },

  meals: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Meal',
    },
  ],
});

export const UserModel = mongoose.model('User', UserSchema);

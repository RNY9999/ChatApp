import mongoose, { Schema, Document} from 'mongoose';

interface User extends Document {
  username: string;
  password: string;
  isDeleted: boolean;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
}, {timestamps: true});

export default mongoose.model<User>('User', UserSchema);
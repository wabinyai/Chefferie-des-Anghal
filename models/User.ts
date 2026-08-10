import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUser extends Document<Types.ObjectId> {
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'editor' | 'translator' | 'historian' | 'project_manager' | 'finance_officer' | 'community_contributor' | 'researcher';
  passwordHash: string;
  disabled: boolean;
  archived: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    name: { type: String, required: true },
    role: { type: String, required: true, enum: ['super_admin', 'admin', 'editor', 'translator', 'historian', 'project_manager', 'finance_officer', 'community_contributor', 'researcher'], default: 'editor' },
    passwordHash: { type: String, required: true, select: false },
    disabled: { type: Boolean, default: false },
    archived: { type: Boolean, default: false },
    lastLoginAt: { type: Date }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const User = (mongoose.models.User as mongoose.Model<IUser> | undefined)
  ?? mongoose.model<IUser>('User', UserSchema);
export default User;

import mongoose, { Document, Schema } from 'mongoose';

export interface IRole extends Document {
  key: string;
  name: string;
  description: string;
  permissions: string[];
  builtIn: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema = new Schema<IRole>(
  {
    key: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    permissions: { type: [String], default: [] },
    builtIn: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
);

const Role = mongoose.models.Role || mongoose.model<IRole>('Role', RoleSchema);
export default Role;

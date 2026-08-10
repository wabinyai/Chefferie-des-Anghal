import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  category: string;
  heroImage?: string;
  summary: string;
  description: string;
  problem: string;
  solution: string;
  location?: Types.ObjectId;
  beneficiaries: string;
  estimatedBeneficiaries?: number;
  startDate?: Date;
  completionDate?: Date;
  status: 'Proposed' | 'Seeking Funding' | 'Funded' | 'In Progress' | 'Completed' | 'Paused';
  manager?: string;
  fundingTarget?: number;
  fundsCommitted?: number;
  fundsReceived?: number;
  currency?: string;
  partners: string[];
  donors: string[];
  milestones: string[];
  progress: number;
  gallery: string[];
  videos: Types.ObjectId[];
  documents: Types.ObjectId[];
  relatedNews: Types.ObjectId[];
  callToAction: string;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true },
    heroImage: { type: String },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    problem: { type: String, default: '' },
    solution: { type: String, default: '' },
    location: { type: Schema.Types.ObjectId, ref: 'Location' },
    beneficiaries: { type: String, default: '' },
    estimatedBeneficiaries: { type: Number },
    startDate: { type: Date },
    completionDate: { type: Date },
    status: { type: String, enum: ['Proposed', 'Seeking Funding', 'Funded', 'In Progress', 'Completed', 'Paused'], default: 'Proposed' },
    manager: { type: String },
    fundingTarget: { type: Number },
    fundsCommitted: { type: Number },
    fundsReceived: { type: Number },
    currency: { type: String, default: 'USD' },
    partners: { type: [String], default: [] },
    donors: { type: [String], default: [] },
    milestones: { type: [String], default: [] },
    progress: { type: Number, default: 0 },
    gallery: { type: [String], default: [] },
    videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
    documents: [{ type: Schema.Types.ObjectId, ref: 'Document' }],
    relatedNews: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
    callToAction: { type: String, default: '' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
);

ProjectSchema.index({ title: 'text', summary: 'text', description: 'text', category: 1 });

const Project = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
export default Project;

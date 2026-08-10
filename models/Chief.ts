import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IChief extends Document<Types.ObjectId> {
  order: number;
  fullName: string;
  customaryName: string;
  alternativeSpellings: string[];
  portrait?: string;
  birthDate?: string;
  deathDate?: string;
  reignStart?: string;
  reignEnd?: string;
  predecessor?: Types.ObjectId;
  successor?: Types.ObjectId;
  lineage?: string;
  biography: string;
  achievements: string[];
  majorEvents: string[];
  oralHistoryNotes: string[];
  documents: Types.ObjectId[];
  sources: Types.ObjectId[];
  relatedPeople: Types.ObjectId[];
  relatedLocations: Types.ObjectId[];
  verificationStatus: 'Verified' | 'Oral Tradition' | 'Under Research' | 'Disputed' | 'Draft';
  status: 'published' | 'draft' | 'archived';
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ChiefSchema = new Schema<IChief>(
  {
    order: { type: Number, required: true, index: true },
    fullName: { type: String, required: true },
    customaryName: { type: String, required: true },
    alternativeSpellings: { type: [String], default: [] },
    portrait: { type: String },
    birthDate: { type: String },
    deathDate: { type: String },
    reignStart: { type: String },
    reignEnd: { type: String },
    predecessor: { type: Schema.Types.ObjectId, ref: 'Chief' },
    successor: { type: Schema.Types.ObjectId, ref: 'Chief' },
    lineage: { type: String },
    biography: { type: String, default: '' },
    achievements: { type: [String], default: [] },
    majorEvents: { type: [String], default: [] },
    oralHistoryNotes: { type: [String], default: [] },
    documents: [{ type: Schema.Types.ObjectId, ref: 'Document' }],
    sources: [{ type: Schema.Types.ObjectId, ref: 'Source' }],
    relatedPeople: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
    relatedLocations: [{ type: Schema.Types.ObjectId, ref: 'Location' }],
    verificationStatus: {
      type: String,
      enum: ['Verified', 'Oral Tradition', 'Under Research', 'Disputed', 'Draft'],
      default: 'Under Research'
    },
    status: { type: String, enum: ['published', 'draft', 'archived'], default: 'draft' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
);

ChiefSchema.index({ fullName: 'text', customaryName: 'text', biography: 'text' });

const Chief = (mongoose.models.Chief as mongoose.Model<IChief> | undefined)
  ?? mongoose.model<IChief>('Chief', ChiefSchema);
export default Chief;

import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IHistoryEvent extends Document {
  title: string;
  period: string;
  description: string;
  image?: string;
  document?: Types.ObjectId;
  location?: Types.ObjectId;
  chief?: Types.ObjectId;
  source?: Types.ObjectId;
  reliability: 'Verified' | 'Probable' | 'Oral Tradition' | 'Conflicting Accounts' | 'Needs Verification';
  status: 'published' | 'draft' | 'archived';
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const HistoryEventSchema = new Schema<IHistoryEvent>(
  {
    title: { type: String, required: true },
    period: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    document: { type: Schema.Types.ObjectId, ref: 'Document' },
    location: { type: Schema.Types.ObjectId, ref: 'Location' },
    chief: { type: Schema.Types.ObjectId, ref: 'Chief' },
    source: { type: Schema.Types.ObjectId, ref: 'Source' },
    reliability: {
      type: String,
      enum: ['Verified', 'Probable', 'Oral Tradition', 'Conflicting Accounts', 'Needs Verification'],
      default: 'Needs Verification'
    },
    status: { type: String, enum: ['published', 'draft', 'archived'], default: 'draft' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
);

HistoryEventSchema.index({ title: 'text', description: 'text', period: 'text' });

const HistoryEvent = mongoose.models.HistoryEvent || mongoose.model<IHistoryEvent>('HistoryEvent', HistoryEventSchema);
export default HistoryEvent;

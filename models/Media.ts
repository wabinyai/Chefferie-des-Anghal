import mongoose, { Document, Schema, Types } from 'mongoose';

interface ICloudinaryMetadata {
  publicId: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  altText?: string;
  caption?: string;
  credit?: string;
  folder?: string;
}

export interface IMediaItem extends Document {
  type: 'image' | 'video' | 'document';
  title: string;
  description?: string;
  cloudinary?: ICloudinaryMetadata;
  youtubeUrl?: string;
  youtubeVideoId?: string;
  category?: string;
  relatedEntity?: Types.ObjectId;
  status: 'public' | 'internal' | 'restricted';
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema = new Schema<IMediaItem>(
  {
    type: { type: String, enum: ['image', 'video', 'document'], required: true },
    title: { type: String, required: true },
    description: { type: String },
    cloudinary: {
      publicId: { type: String },
      secureUrl: { type: String },
      width: { type: Number },
      height: { type: Number },
      format: { type: String },
      bytes: { type: Number },
      altText: { type: String },
      caption: { type: String },
      credit: { type: String },
      folder: { type: String }
    },
    youtubeUrl: { type: String },
    youtubeVideoId: { type: String },
    category: { type: String },
    relatedEntity: { type: Schema.Types.ObjectId },
    status: { type: String, enum: ['public', 'internal', 'restricted'], default: 'public' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
);

MediaSchema.index({ title: 'text', description: 'text', category: 1 });

const Media = mongoose.models.Media || mongoose.model<IMediaItem>('Media', MediaSchema);
export default Media;

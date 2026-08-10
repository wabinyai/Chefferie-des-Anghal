import mongoose, { Document, Schema } from 'mongoose';

export interface ISetting extends Document {
  key: string;
  value: unknown;
  group: string;
  editable: boolean;
  locale?: 'fr' | 'en' | 'alur';
  createdAt: Date;
  updatedAt: Date;
}

const SettingSchema = new Schema<ISetting>(
  {
    key: { type: String, required: true, unique: true, index: true },
    value: { type: Schema.Types.Mixed, required: true },
    group: { type: String, default: 'general' },
    editable: { type: Boolean, default: true },
    locale: { type: String, enum: ['fr', 'en', 'alur'] }
  },
  {
    timestamps: true
  }
);

const Setting = mongoose.models.Setting || mongoose.model<ISetting>('Setting', SettingSchema);
export default Setting;

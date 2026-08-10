import mongoose, { Document, Schema } from 'mongoose';

export interface ISiteSetting extends Document {
  key: string;
  label: string;
  value: string | Record<string, unknown>;
  locale?: 'fr' | 'en' | 'alur';
  group: string;
  editable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SiteSettingSchema = new Schema<ISiteSetting>(
  {
    key: { type: String, required: true, unique: true, index: true },
    label: { type: String, required: true },
    value: { type: Schema.Types.Mixed, required: true },
    locale: { type: String, enum: ['fr', 'en', 'alur'] },
    group: { type: String, required: true, default: 'general' },
    editable: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
);

const SiteSetting = mongoose.models.SiteSetting || mongoose.model<ISiteSetting>('SiteSetting', SiteSettingSchema);
export default SiteSetting;

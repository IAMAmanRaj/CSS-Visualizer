import mongoose, { Document, Schema } from 'mongoose';

export interface IPattern extends Document {
  name: string;
  type: 'flexbox' | 'grid' | 'custom';
  css: string;
  html: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PatternSchema = new Schema<IPattern>(
  {
    name: {
      type: String,
      required: [true, 'Pattern name is required'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    type: {
      type: String,
      required: [true, 'Pattern type is required'],
      enum: ['flexbox', 'grid', 'custom'],
    },
    css: {
      type: String,
      required: [true, 'CSS content is required'],
    },
    html: {
      type: String,
      required: [true, 'HTML content is required'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
PatternSchema.index({ type: 1 });
PatternSchema.index({ createdAt: -1 });

export default mongoose.model<IPattern>('Pattern', PatternSchema);

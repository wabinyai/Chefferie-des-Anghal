import { Types } from 'mongoose';
import { z } from 'zod';

const optionalText = z.string().trim().max(5_000).optional();
const optionalObjectId = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid record identifier').optional();

export const chiefInputSchema = z.object({
  order: z.number().int().positive(),
  fullName: z.string().trim().min(1).max(160),
  customaryName: z.string().trim().min(1).max(160),
  portrait: z.string().trim().url().max(2_000).optional(),
  reignStart: z.string().trim().max(40).optional(),
  reignEnd: z.string().trim().max(40).optional(),
  predecessor: optionalObjectId,
  successor: optionalObjectId,
  biography: optionalText,
  status: z.enum(['published', 'draft', 'archived']).optional()
}).strict();

export const chiefPatchSchema = chiefInputSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  'At least one field is required'
);

type RelatedChief = {
  _id: Types.ObjectId;
  fullName: string;
};

export type ChiefRecord = {
  _id: Types.ObjectId;
  order: number;
  fullName: string;
  customaryName: string;
  portrait?: string;
  reignStart?: string;
  reignEnd?: string;
  predecessor?: RelatedChief | Types.ObjectId | null;
  successor?: RelatedChief | Types.ObjectId | null;
  biography?: string;
  status: 'published' | 'draft' | 'archived';
};

function serializeRelation(relation: ChiefRecord['predecessor']) {
  if (!relation || relation instanceof Types.ObjectId || !('fullName' in relation)) {
    return null;
  }

  return { _id: relation._id.toString(), fullName: relation.fullName };
}

export function serializeChief(chief: ChiefRecord) {
  return {
    _id: chief._id.toString(),
    order: chief.order,
    fullName: chief.fullName,
    customaryName: chief.customaryName,
    portrait: chief.portrait,
    reignStart: chief.reignStart,
    reignEnd: chief.reignEnd,
    predecessor: serializeRelation(chief.predecessor),
    successor: serializeRelation(chief.successor),
    biography: chief.biography ?? '',
    status: chief.status
  };
}

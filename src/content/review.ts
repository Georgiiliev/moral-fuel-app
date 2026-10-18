import type { ContentReviewStatus } from '@/models/content';

/**
 * Every lesson written for Phase 1 is an editorial draft. Only a qualified human reviewer may
 * move content to APPROVED, and the validator rejects APPROVED without reviewer and date.
 */
export const PHASE_1_DRAFT: ContentReviewStatus = {
  state: 'EDITORIAL_DRAFT',
  authoredBy: 'Moral Fuel editorial (AI-assisted draft)',
  authoredOn: '2026-10-17',
  notes: 'Awaiting review by a qualified theological reviewer before release.',
};

export const PHASE_1_AUTHOR = 'Moral Fuel editorial';

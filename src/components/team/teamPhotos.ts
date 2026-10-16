import { byFileName } from '../../utils/assets'

// Every photo in src/assets/team/, keyed by file name without the extension.
// Advisor photos are named by position (advisor-1, advisor-2 = left → right);
// member photos are whatever file name the member's `photo` field in site.ts points to.
export const teamPhotos = byFileName(
  import.meta.glob<string>('../../assets/team/*.webp', { eager: true, import: 'default' }),
)

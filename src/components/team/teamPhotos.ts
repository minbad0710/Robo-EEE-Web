import { byFileName } from '../../utils/assets'

// Every photo in src/assets/team/, keyed by file name without the extension.
// Photos are named by position: advisor-1, advisor-2 = advisor cards left → right;
// member-1, member-2, … = member cards in reading order (same order as `members` in site.ts).
export const teamPhotos = byFileName(
  import.meta.glob<string>('../../assets/team/*.webp', { eager: true, import: 'default' }),
)

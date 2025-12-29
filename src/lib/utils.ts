import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn - ClassName Utility
 * ----------------------
 * Merges Tailwind CSS classes intelligently, handling conflicts.
 * Combines clsx for conditional classes with tailwind-merge for deduplication.
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-cyan-500', 'px-6') // 'py-2 px-6 bg-cyan-500'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

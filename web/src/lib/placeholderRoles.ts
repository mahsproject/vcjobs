import type { Category } from './generated/contracts';
import { categoryLabel } from './labels';

/** The half of the placeholder that never changes. */
export const ROLE_PREFIX = 'Search VC roles: ';

/** The VC role specializations the search box types, in order. */
export const PLACEHOLDER_ROLES: Category[] = [
  'finance',
  'operations',
  'marketing',
  'recruiting',
  'data_science',
  'product',
];

export const ROLE_PLACEHOLDER: { prefix: string; roles: string[] } = {
  prefix: ROLE_PREFIX,
  roles: PLACEHOLDER_ROLES.map(categoryLabel),
};

export const TYPE_MS = 55;
export const DELETE_MS = 28;
export const HOLD_MS = 1500;

export interface TypewriterState {
  role: number;
  chars: number;
  deleting: boolean;
}

export function typewriterStart(roles: string[]): TypewriterState {
  return { role: 0, chars: (roles[0] ?? '').length, deleting: false };
}

export function typedTail(state: TypewriterState, roles: string[]): string {
  return (roles[state.role] ?? '').slice(0, state.chars);
}

export function typewriterStep(
  state: TypewriterState,
  roles: string[],
): { next: TypewriterState; delayMs: number } {
  const word = roles[state.role] ?? '';
  const nextRole = (state.role + 1) % Math.max(roles.length, 1);

  if (word.length === 0) {
    return { next: { role: nextRole, chars: 0, deleting: false }, delayMs: TYPE_MS };
  }

  if (!state.deleting) {
    if (state.chars < word.length) {
      return { next: { ...state, chars: state.chars + 1 }, delayMs: TYPE_MS };
    }
    return { next: { ...state, chars: word.length - 1, deleting: true }, delayMs: HOLD_MS };
  }

  if (state.chars > 0) {
    return { next: { ...state, chars: state.chars - 1 }, delayMs: DELETE_MS };
  }
  return { next: { role: nextRole, chars: 1, deleting: false }, delayMs: TYPE_MS };
}

export function completeWord(state: TypewriterState, roles: string[]): TypewriterState {
  return { role: state.role, chars: (roles[state.role] ?? '').length, deleting: false };
}

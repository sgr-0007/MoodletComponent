import { PaletteKey } from '../../theme/palette';

export type MoodletProps = {
  /** Single letter, icon, word or combination */
  children: React.ReactNode;
  variant?: PaletteKey;
  readOnly?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  onRightClick?: (e: React.MouseEvent) => void;
  className?: string;
  title?: string;
  /** Optional ID for the element (for accessibility and testing) */
  id?: string;
}

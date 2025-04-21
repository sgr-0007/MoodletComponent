import React from 'react';
import { palette } from '../../theme/palette';
import { MoodletProps } from './moodlet.types';

const Moodlet: React.FC<MoodletProps> = ({
  children,
  variant = 'primary',
  readOnly = false,
  disabled = false,
  onClick,
  onRightClick,
  className = '',
  title,
  id,
}) => {
  const p = disabled ? palette.disabled : palette[variant];
  const pointer =
    !readOnly && !disabled && (onClick || onRightClick)
      ? 'cursor-pointer'
      : 'cursor-default';

  return (
    <span
      role="button"
      id={id}
      title={title || variant}
      onClick={disabled || readOnly ? undefined : onClick}
      onContextMenu={disabled || readOnly ? undefined : onRightClick}
      className={`inline-flex items-center justify-center gap-1 px-1.5 h-5 min-w-[42px]
                  rounded-full border text-xs font-semibold select-none transition-colors
                  ${p.bg} ${p.border} ${p.text} ${!readOnly && p.hover} ${pointer} ${className}`}
    >
      {children}
    </span>
  );
};

export default React.memo(Moodlet);

import React, { useState, useEffect } from 'react';
import Moodlet from '../moodlet/Moodlet';
import { PaletteKey } from '../../theme/palette';
import { FscState } from './fsc.types';

export type FscMoodletProps = {
  /** Label text displayed in the moodlet */
  label: string;
  /** Initial state of the moodlet */                 
  initialState?: FscState;
  /** Current state (if controlled externally) */
  state?: FscState;
  /** Callback when state changes */
  onChange?: (s: FscState) => void;
  /** Whether the moodlet is read-only */
  readOnly?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** ID for the moodlet (for accessibility and testing) */
  id?: string;
}

/** Maps FSC states to palette colors */
export const stateToVariantMap: Record<FscState, PaletteKey> = {
  'not-required': 'disabled',
  required:       'inactive',
  current:        'red',
  completed:      'green',
};

const FscMoodlet: React.FC<FscMoodletProps> = ({
  label,
  initialState = 'required',
  state: externalState,
  onChange,
  readOnly = false,
  className = '',
  id,
}) => {
  // Use internal state if not controlled externally
  const [internalState, setInternalState] = useState<FscState>(initialState);
  
  // Determine which state to use (controlled or uncontrolled)
  const state = externalState !== undefined ? externalState : internalState;
  
  // Update internal state if external state changes
  useEffect(() => {
    if (externalState !== undefined) {
      setInternalState(externalState);
    }
  }, [externalState]);

  const cycle = () => {
    if (readOnly) return;
    
    const next: FscState =
      state === 'required'  ? 'current'   :
      state === 'current'   ? 'completed' :
      state === 'completed' ? 'current'   :
      state;          // ignore left‑click in "not‑required"
    
    if (next !== state) {
      setInternalState(next);
      onChange?.(next);
    }
  };

  const toggleNotRequired = (e: React.MouseEvent) => {
    if (readOnly || state === 'current') return;
    
    e.preventDefault();
    let next: FscState;
    
    if (state === 'completed') {
      next = 'required';
    } else {
      next = state === 'not-required' ? 'required' : 'not-required';
    }
    
    setInternalState(next);
    onChange?.(next);
  };

  return (
    <Moodlet
      variant={stateToVariantMap[state]}
      onClick={cycle}
      onRightClick={toggleNotRequired}
      title={`State: ${state}`}
      readOnly={readOnly}
      className={className}
      id={id}
    >
      {label}
    </Moodlet>
  );
};

export default FscMoodlet;

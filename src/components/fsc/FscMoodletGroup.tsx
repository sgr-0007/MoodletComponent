import React from 'react';
import FscMoodlet from './FscMoodlet';
import { FscState } from './fsc.types';

export type MoodletConfig = {
  label: string;
  id: string;
  initialState?: FscState;
};

export type FscMoodletGroupProps = {
  moodlets?: MoodletConfig[];
  className?: string;
  onChange?: (id: string, state: FscState) => void;
}

const DEFAULT_MOODLETS: MoodletConfig[] = [
  { id: 'fuelling', label: 'FUELLING' },
  { id: 'servicing', label: 'SERVICING' },
  { id: 'cleaning', label: 'CLEANING' }
];

const FscMoodletGroup: React.FC<FscMoodletGroupProps> = ({
  moodlets = DEFAULT_MOODLETS,
  className = '',
  onChange
}) => {
  const handleChange = (id: string) => (state: FscState) => {
    onChange?.(id, state);
  };

  return (
    <div className={`flex gap-2 p-4 bg-white rounded-xl shadow ${className}`}>
      {moodlets.map((moodlet) => (
        <FscMoodlet
          key={moodlet.id}
          label={moodlet.label}
          initialState={moodlet.initialState}
          onChange={onChange ? handleChange(moodlet.id) : undefined}
        />
      ))}
    </div>
  );
};

export default FscMoodletGroup;

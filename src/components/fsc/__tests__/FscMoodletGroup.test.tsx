import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/test-utils';
import FscMoodletGroup from '../FscMoodletGroup';

describe('FscMoodletGroup', () => {
  it('renders all three moodlets', () => {
    render(<FscMoodletGroup />);
    
    // Check that all three moodlets are rendered
    const fuellingMoodlet = screen.getByRole('button', { name: 'FUELLING' });
    const servicingMoodlet = screen.getByRole('button', { name: 'SERVICING' });
    const cleaningMoodlet = screen.getByRole('button', { name: 'CLEANING' });
    
    expect(fuellingMoodlet).toBeInTheDocument();
    expect(servicingMoodlet).toBeInTheDocument();
    expect(cleaningMoodlet).toBeInTheDocument();
  });

  it('renders with the correct container styling', () => {
    const { container } = render(<FscMoodletGroup />);
    
    // Find the container div
    const groupContainer = container.firstChild;
    
    // Check that the container has the expected classes
    expect(groupContainer).toHaveClass('flex');
    expect(groupContainer).toHaveClass('gap-2');
    expect(groupContainer).toHaveClass('p-4');
    expect(groupContainer).toHaveClass('bg-white');
    expect(groupContainer).toHaveClass('rounded-xl');
    expect(groupContainer).toHaveClass('shadow');
  });

  it('renders all moodlets in the required state by default', () => {
    render(<FscMoodletGroup />);
    
    // Get all moodlets
    const moodlets = screen.getAllByRole('button');
    
    // Check that all moodlets have the default 'required' state
    moodlets.forEach(moodlet => {
      expect(moodlet).toHaveAttribute('title', 'State: required');
    });
  });
});

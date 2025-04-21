import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../test/test-utils';
import FscMoodlet from '../FscMoodlet';
import { FscState } from '../fsc.types';

describe('FscMoodlet', () => {
  it('renders with default props', () => {
    render(<FscMoodlet label="FUELLING" />);
    
    const moodlet = screen.getByRole('button', { name: 'FUELLING' });
    expect(moodlet).toBeInTheDocument();
    expect(moodlet).toHaveAttribute('title', 'State: required');
  });

  it('renders with initial state', () => {
    render(<FscMoodlet label="CLEANING" initialState={"current" as FscState} />);
    
    const moodlet = screen.getByRole('button', { name: 'CLEANING' });
    expect(moodlet).toBeInTheDocument();
    expect(moodlet).toHaveAttribute('title', 'State: current');
    // Red color for current state
    expect(moodlet).toHaveClass('bg-[#D22D5C]');
  });

  it('cycles through states on click', () => {
    render(<FscMoodlet label="SERVICING" />);
    
    const moodlet = screen.getByRole('button', { name: 'SERVICING' });
    
    // Initial state is 'required'
    expect(moodlet).toHaveAttribute('title', 'State: required');
    
    // First click: required -> current
    fireEvent.click(moodlet);
    expect(moodlet).toHaveAttribute('title', 'State: current');
    expect(moodlet).toHaveClass('bg-[#D22D5C]'); // Red for current
    
    // Second click: current -> completed
    fireEvent.click(moodlet);
    expect(moodlet).toHaveAttribute('title', 'State: completed');
    expect(moodlet).toHaveClass('bg-[#319B31]'); // Green for completed
    
    // Third click: completed -> current (cycles back)
    fireEvent.click(moodlet);
    expect(moodlet).toHaveAttribute('title', 'State: current');
    expect(moodlet).toHaveClass('bg-[#D22D5C]'); // Red for current
  });

  it('toggles not-required state on right-click', () => {
    render(<FscMoodlet label="FUELLING" />);
    
    const moodlet = screen.getByRole('button', { name: 'FUELLING' });
    
    // Initial state is 'required'
    expect(moodlet).toHaveAttribute('title', 'State: required');
    
    // Right-click: required -> not-required
    fireEvent.contextMenu(moodlet);
    expect(moodlet).toHaveAttribute('title', 'State: not-required');
    expect(moodlet).toHaveClass('bg-[#E2DEED]'); // Disabled color
    
    // Right-click again: not-required -> required
    fireEvent.contextMenu(moodlet);
    expect(moodlet).toHaveAttribute('title', 'State: required');
    expect(moodlet).toHaveClass('bg-[#998DBF]'); // Inactive color
  });

  it('calls onChange when state changes', () => {
    const handleChange = vi.fn();
    render(<FscMoodlet label="FUELLING" onChange={handleChange} />);
    
    const moodlet = screen.getByRole('button', { name: 'FUELLING' });
    
    // Click to change state: required -> current
    fireEvent.click(moodlet);
    expect(handleChange).toHaveBeenCalledWith('current' as FscState);
    
    // Right-click has no effect in current state
    handleChange.mockClear();
    fireEvent.contextMenu(moodlet);
    expect(handleChange).not.toHaveBeenCalled();
    
    // Click to change state: current -> completed
    fireEvent.click(moodlet);
    expect(handleChange).toHaveBeenCalledWith('completed' as FscState);
    
    // Right-click to change state: completed -> required
    handleChange.mockClear();
    fireEvent.contextMenu(moodlet);
    expect(handleChange).toHaveBeenCalledWith('required' as FscState);
  });

  it('does not cycle state when in not-required state', () => {
    render(<FscMoodlet label="FUELLING" initialState={"not-required" as FscState} />);
    
    const moodlet = screen.getByRole('button', { name: 'FUELLING' });
    
    // Initial state is 'not-required'
    expect(moodlet).toHaveAttribute('title', 'State: not-required');
    
    // Click should not change state when in not-required
    fireEvent.click(moodlet);
    expect(moodlet).toHaveAttribute('title', 'State: not-required');
    expect(moodlet).toHaveClass('bg-[#E2DEED]'); // Still disabled color
  });
});

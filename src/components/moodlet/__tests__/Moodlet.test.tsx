import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../test/test-utils';
import Moodlet from '../Moodlet';

describe('Moodlet', () => {
  it('renders with default props', () => {
    render(<Moodlet title="Test Moodlet">Test</Moodlet>);
    
    const moodlet = screen.getByRole('button', { name: 'Test' });
    expect(moodlet).toBeInTheDocument();
    expect(moodlet).toHaveAttribute('title', 'Test Moodlet');
  });

  it('renders with custom variant', () => {
    render(<Moodlet variant="green" title="Test Moodlet">Green</Moodlet>);
    
    const moodlet = screen.getByRole('button', { name: 'Green' });
    expect(moodlet).toBeInTheDocument();
    expect(moodlet).toHaveAttribute('title', 'Test Moodlet');
    expect(moodlet).toHaveClass('bg-[#319B31]');
  });

  it('handles click events when not disabled or readonly', () => {
    const handleClick = vi.fn();
    render(
      <Moodlet onClick={handleClick} title="Test Moodlet">
        Clickable
      </Moodlet>
    );
    
    const moodlet = screen.getByRole('button', { name: 'Clickable' });
    fireEvent.click(moodlet);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not trigger click events when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Moodlet onClick={handleClick} disabled title="Test Moodlet">
        Disabled
      </Moodlet>
    );
    
    const moodlet = screen.getByRole('button', { name: 'Disabled' });
    expect(moodlet).toHaveClass('bg-[#E2DEED]');
    fireEvent.click(moodlet);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('does not trigger click events when readOnly', () => {
    const handleClick = vi.fn();
    render(
      <Moodlet onClick={handleClick} readOnly title="Test Moodlet">
        ReadOnly
      </Moodlet>
    );
    
    const moodlet = screen.getByRole('button', { name: 'ReadOnly' });
    fireEvent.click(moodlet);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('handles right-click events when not disabled or readonly', () => {
    const handleRightClick = vi.fn();
    render(
      <Moodlet onRightClick={handleRightClick} title="Test Moodlet">
        Right Clickable
      </Moodlet>
    );
    
    const moodlet = screen.getByRole('button', { name: 'Right Clickable' });
    fireEvent.contextMenu(moodlet);
    expect(handleRightClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(
      <Moodlet className="custom-class" title="Test Moodlet">
        Custom Class
      </Moodlet>
    );
    
    const moodlet = screen.getByRole('button', { name: 'Custom Class' });
    expect(moodlet).toHaveClass('custom-class');
  });
});

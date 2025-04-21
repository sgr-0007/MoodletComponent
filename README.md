# FSC Moodlet Component

A React component library for displaying and interacting with FSC (Fuelling, Servicing, Cleaning) status indicators. This library provides a flexible and reusable way to represent the state of FSC operations in a user interface.

## Components

### Base Components
- **Moodlet**: The fundamental UI element that displays a status with appropriate styling
- **FscMoodlet**: A specialized Moodlet that implements the FSC state logic
- **FscMoodletGroup**: A container for grouping related FSC Moodlets

## Implementation Choices

### Architecture

- **Component Composition**: Used a layered approach with base components that can be composed together
- **Controlled & Uncontrolled Modes**: Implemented support for both controlled (state managed by parent) and uncontrolled (internal state) patterns
- **Type-First Design**: Used TypeScript types for all component props and state definitions
- **State Mapping**: Created explicit mapping between logical states and visual representations

### State Management

- **State Transitions**: Implemented clear and predictable state transitions based on user interactions
  - Left-click: required → current → completed → current (cycles between current and completed)
  - Right-click: required ↔ not-required, completed → required
  - No effect: right-click in current state, left-click in not-required state
- **Callback System**: Used onChange callbacks to notify parent components of state changes
- **Read-Only Support**: Added read-only mode for display-only scenarios

### Integration Considerations

- **Flexible Configuration**: Made components highly configurable through props
- **Styling Flexibility**: Used utility classes and allowed custom class injection
- **Accessibility**: Added proper ARIA roles and title attributes
- **ID Support**: Added ID prop support for testing and accessibility

## Impact on Broader System Integration

- **Scalability**: The component architecture allows for easy extension to other similar status indicators
- **Consistency**: Enforces consistent behavior across the application
- **Maintainability**: Clear separation of concerns makes maintenance easier
  - UI representation (Moodlet)
  - Business logic (FscMoodlet)
  - Grouping and layout (FscMoodletGroup)
- **Reusability**: Components can be used individually or together
- **State Management Integration**: Can easily integrate with global state management systems like Redux or Context API
- **Testing**: Components are designed to be easily testable

## Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd moodlet

# Install dependencies
npm install

# Start development server
npm run dev
```

### Running Tests

```bash
# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch
```

### Usage Examples

#### Basic Usage

```tsx
import { FscMoodlet } from './components/fsc/FscMoodlet';

function MyComponent() {
  return (
    <div>
      <FscMoodlet label="FUELLING" />
    </div>
  );
}
```

#### With Initial State

```tsx
import { FscMoodlet } from './components/fsc/FscMoodlet';
import { FscState } from './components/fsc/fsc.types';

function MyComponent() {
  return (
    <div>
      <FscMoodlet 
        label="CLEANING" 
        initialState="current" as FscState 
      />
    </div>
  );
}
```

#### Controlled Component

```tsx
import { useState } from 'react';
import { FscMoodlet } from './components/fsc/FscMoodlet';
import { FscState } from './components/fsc/fsc.types';

function MyComponent() {
  const [state, setState] = useState<FscState>('required');
  
  return (
    <div>
      <FscMoodlet 
        label="SERVICING" 
        state={state}
        onChange={(newState) => {
          setState(newState);
          console.log(`State changed to: ${newState}`);
        }} 
      />
      <div>Current state: {state}</div>
    </div>
  );
}
```

#### Using FscMoodletGroup

```tsx
import { FscMoodletGroup } from './components/fsc/FscMoodletGroup';
import { FscState } from './components/fsc/fsc.types';

function MyComponent() {
  const handleChange = (id: string, state: FscState) => {
    console.log(`Moodlet ${id} changed to state: ${state}`);
  };
  
  // Using custom moodlets
  const customMoodlets = [
    { id: 'fuel', label: 'FUEL', initialState: 'required' as FscState },
    { id: 'service', label: 'SERVICE', initialState: 'current' as FscState },
    { id: 'clean', label: 'CLEAN', initialState: 'completed' as FscState },
  ];
  
  return (
    <div>
      {/* With default moodlets */}
      <FscMoodletGroup onChange={handleChange} />
      
      {/* With custom moodlets */}
      <FscMoodletGroup 
        moodlets={customMoodlets}
        onChange={handleChange}
        className="mt-4" 
      />
    </div>
  );
}
```

#### Read-Only Mode

```tsx
import { FscMoodlet } from './components/fsc/FscMoodlet';

function MyComponent() {
  return (
    <div>
      <FscMoodlet 
        label="FUELLING" 
        initialState="completed" as FscState
        readOnly={true}
      />
    </div>
  );
}
```

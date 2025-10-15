import { useState } from 'react';
import styles from './Button.module.css';

/**
 * Button Component - A reusable button with different variants
 *
 * This component demonstrates:
 * - Props (properties passed to components)
 * - Conditional styling
 * - Event handlers
 * - State management with useState hook
 *
 * @param {Object} props - Component props
 * @param {string} props.children - Text content inside the button
 * @param {string} props.variant - Button style variant ('primary', 'secondary', 'danger')
 * @param {Function} props.onClick - Function to call when button is clicked
 * @param {boolean} props.disabled - Whether the button is disabled
 */
export default function Button({ children, variant = 'primary', onClick, disabled = false }) {
  // useState hook - manages component state
  // [currentValue, setterFunction] = useState(initialValue)
  const [isClicked, setIsClicked] = useState(false);

  // Event handler function
  const handleClick = () => {
    if (disabled) return; // Early return if button is disabled

    setIsClicked(true); // Update state

    // Call the onClick prop if it exists
    if (onClick) {
      onClick();
    }

    // Reset the clicked state after 200ms for visual feedback
    setTimeout(() => setIsClicked(false), 200);
  };

  // Dynamic className based on props and state
  const buttonClasses = [
    styles.button,
    styles[variant], // styles.primary, styles.secondary, or styles.danger
    isClicked && styles.clicked, // Add clicked class when button is pressed
    disabled && styles.disabled, // Add disabled class when button is disabled
  ]
    .filter(Boolean) // Remove any falsy values
    .join(' '); // Join array into a string

  return (
    <button className={buttonClasses} onClick={handleClick} disabled={disabled} type='button'>
      {children}
    </button>
  );
}

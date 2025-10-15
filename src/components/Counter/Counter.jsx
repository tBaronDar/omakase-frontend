import { useState, useEffect } from 'react';
import Button from '@/components/Button/Button';
import styles from './Counter.module.css';

/**
 * Counter Component - Demonstrates React Hooks
 *
 * This component shows:
 * - useState hook for managing state
 * - useEffect hook for side effects
 * - Event handling
 * - Conditional rendering
 * - Component composition (using Button component)
 */
export default function Counter() {
  // State for the counter value
  const [count, setCount] = useState(0);

  // State for tracking if counter is running
  const [isRunning, setIsRunning] = useState(false);

  // useEffect hook - runs after every render
  // This is like componentDidMount + componentDidUpdate in class components
  useEffect(() => {
    let interval = null;

    if (isRunning) {
      // Set up an interval that increments count every second
      interval = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    } else {
      // Clear the interval when not running
      clearInterval(interval);
    }

    // Cleanup function - runs before the next effect or when component unmounts
    return () => clearInterval(interval);
  }, [isRunning]); // Dependency array - effect runs when isRunning changes

  // Event handler functions
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleReset = () => {
    setCount(0);
    setIsRunning(false);
  };

  const handleToggle = () => {
    setIsRunning(!isRunning);
  };

  // Conditional rendering based on count value
  const getCountColor = () => {
    if (count > 10) return styles.high;
    if (count < 0) return styles.negative;
    return styles.normal;
  };

  return (
    <div className={styles.counter}>
      <h2 className={styles.title}>React Counter Demo</h2>

      {/* Display the current count with conditional styling */}
      <div className={`${styles.display} ${getCountColor()}`}>{count}</div>

      {/* Control buttons */}
      <div className={styles.controls}>
        <Button variant='secondary' onClick={handleDecrement} disabled={isRunning}>
          - Decrease
        </Button>

        <Button variant='primary' onClick={handleIncrement} disabled={isRunning}>
          + Increase
        </Button>
      </div>

      {/* Auto-increment controls */}
      <div className={styles.autoControls}>
        <Button variant={isRunning ? 'danger' : 'primary'} onClick={handleToggle}>
          {isRunning ? '⏸️ Stop' : '▶️ Start'} Auto-increment
        </Button>

        <Button variant='secondary' onClick={handleReset}>
          🔄 Reset
        </Button>
      </div>

      {/* Status message */}
      <div className={styles.status}>
        {isRunning ? (
          <p className={styles.running}>⏱️ Auto-incrementing every second...</p>
        ) : (
          <p className={styles.stopped}>⏹️ Auto-increment stopped</p>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import Button from '@/components/Button/Button';
import styles from './TodoList.module.css';

/**
 * TodoList Component - Demonstrates List Management
 *
 * This component shows:
 * - Managing arrays in state
 * - Adding/removing items from lists
 * - Conditional rendering with map()
 * - Form handling
 * - Input validation
 */
export default function TodoList() {
  // State for the list of todos
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React basics', completed: false },
    { id: 2, text: 'Practice with hooks', completed: true },
    { id: 3, text: 'Build your first app', completed: false },
  ]);

  // State for the input field
  const [inputValue, setInputValue] = useState('');

  // Function to add a new todo
  const addTodo = () => {
    // Validate input
    if (!inputValue.trim()) {
      alert('Please enter a todo item!');
      return;
    }

    // Create new todo object
    const newTodo = {
      id: Date.now(), // Simple ID generation using timestamp
      text: inputValue.trim(),
      completed: false,
    };

    // Add new todo to the list
    setTodos([...todos, newTodo]);

    // Clear the input
    setInputValue('');
  };

  // Function to toggle todo completion
  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Function to handle Enter key in input
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  };

  // Calculate statistics
  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;
  const remainingCount = totalCount - completedCount;

  return (
    <div className={styles.todoList}>
      <h2 className={styles.title}>📝 Todo List</h2>

      {/* Add new todo section */}
      <div className={styles.addSection}>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder='What do you need to do?'
          className={styles.input}
        />
        <Button onClick={addTodo} variant='primary'>
          ➕ Add Todo
        </Button>
      </div>

      {/* Statistics */}
      <div className={styles.stats}>
        <span className={styles.statItem}>
          Total: <strong>{totalCount}</strong>
        </span>
        <span className={styles.statItem}>
          Completed: <strong className={styles.completed}>{completedCount}</strong>
        </span>
        <span className={styles.statItem}>
          Remaining: <strong className={styles.remaining}>{remainingCount}</strong>
        </span>
      </div>

      {/* Todo list */}
      <div className={styles.list}>
        {todos.length === 0 ? (
          <p className={styles.emptyMessage}>🎉 No todos! Add one above to get started.</p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
              <input
                type='checkbox'
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className={styles.checkbox}
              />

              <span className={styles.todoText}>{todo.text}</span>

              <Button onClick={() => deleteTodo(todo.id)} variant='danger' className={styles.deleteButton}>
                🗑️
              </Button>
            </div>
          ))
        )}
      </div>

      {/* Clear completed button */}
      {completedCount > 0 && (
        <div className={styles.clearSection}>
          <Button onClick={() => setTodos(todos.filter((todo) => !todo.completed))} variant='secondary'>
            🧹 Clear Completed ({completedCount})
          </Button>
        </div>
      )}
    </div>
  );
}

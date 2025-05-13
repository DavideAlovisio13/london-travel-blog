import React, { useState } from 'react';
import { todoItems as initialTodoItems } from '../data/todoItems';
import '../styles/components/TodoList.css';

function TodoList() {
  const [todoItems, setTodoItems] = useState(initialTodoItems);
  
  const toggleCompleted = (index) => {
    const updatedTodoItems = [...todoItems];
    updatedTodoItems[index].completed = !updatedTodoItems[index].completed;
    setTodoItems(updatedTodoItems);
  };
  
  return (
    <section className="bgsect">
      <h3 className="title">Cose da fare</h3>
      <ul>
        {todoItems.map((item, index) => (
          <li key={index} onClick={() => toggleCompleted(index)} className="todo-item">
            <p>
              {item.description} {item.completed ? '✓' : '✗'}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TodoList;
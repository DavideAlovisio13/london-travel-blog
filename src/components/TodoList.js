import React, { useState, useCallback, memo } from 'react';
import { todoItems as initialTodoItems } from '../data/todoItems';
import '../styles/components/TodoList.css';

// Utilizziamo React.memo per il componente per evitare re-render non necessari
const TodoList = memo(() => {
    const [todoItems, setTodoItems] = useState(initialTodoItems);
    const [filter, setFilter] = useState('all'); // all, completed, todo

    // Usiamo useCallback per non ricreare questa funzione ad ogni render
    const toggleCompleted = useCallback((index) => {
        setTodoItems(prevItems => {
            const updatedTodoItems = [...prevItems];
            updatedTodoItems[index].completed = !updatedTodoItems[index].completed;
            return updatedTodoItems;
        });
    }, []);

    // Filtra gli elementi in base al filtro attivo
    const filteredItems = todoItems.filter(item => {
        if (filter === 'all') return true;
        if (filter === 'completed') return item.completed;
        if (filter === 'todo') return !item.completed;
        return true;
    });

    // Calcola le statistiche
    const stats = {
        total: todoItems.length,
        completed: todoItems.filter(item => item.completed).length,
        remaining: todoItems.filter(item => !item.completed).length
    };

    return (
        <section className="bgsect">
            <h3 className="title">Cose da fare</h3>

            <div className="todo-filters">
                <button
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    Tutte ({stats.total})
                </button>
                <button
                    className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                    onClick={() => setFilter('completed')}
                >
                    Completate ({stats.completed})
                </button>
                <button
                    className={`filter-btn ${filter === 'todo' ? 'active' : ''}`}
                    onClick={() => setFilter('todo')}
                >
                    Da fare ({stats.remaining})
                </button>
            </div>

            <ul className="todo-list">
                {filteredItems.map((item, index) => {
                    const originalIndex = todoItems.findIndex(todo => todo === item);
                    return (
                        <li
                            key={originalIndex}
                            onClick={() => toggleCompleted(originalIndex)}
                            className={`todo-item ${item.completed ? 'completed' : ''}`}
                        >
                            <div className="todo-checkbox">
                                <span className="checkbox-icon">{item.completed ? '✓' : ''}</span>
                            </div>
                            <p>{item.description}</p>
                        </li>
                    );
                })}
            </ul>

            {filteredItems.length === 0 && (
                <p className="empty-list-message">
                    {filter === 'all'
                        ? 'Non ci sono attività nella lista.'
                        : filter === 'completed'
                            ? 'Non ci sono attività completate.'
                            : 'Non ci sono attività da fare.'}
                </p>
            )}

            <div className="todo-stats">
                <div className="progress-bar">
                    <div
                        className="progress"
                        style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                    ></div>
                </div>
                <p className="stats-text">
                    {stats.completed} di {stats.total} attività completate
                </p>
            </div>
        </section>
    );
});

export default TodoList;
import React, { useState, useMemo, memo } from 'react';
import { expensesData } from '../data/expenses';
import '../styles/components/ExpensesTable.css';

// Utilizziamo React.memo per il componente
const ExpensesTable = memo(() => {
    const [search, setSearch] = useState('');
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'ascending'
    });

    // Utilizziamo useMemo per calcoli costosi come il filtraggio e l'ordinamento
    const filteredAndSortedExpenses = useMemo(() => {
        // Prima filtriamo i dati
        let filtered = expensesData;
        if (search.trim() !== '') {
            const searchLower = search.toLowerCase();
            filtered = expensesData.filter(expense =>
                expense.description.toLowerCase().includes(searchLower)
            );
        }

        // Poi ordiniamo se necessario
        if (sortConfig.key) {
            filtered.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }

        return filtered;
    }, [search, sortConfig, expensesData]);

    // Calcoli statistici
    const statistics = useMemo(() => {
        const totalExpenses = filteredAndSortedExpenses.reduce((total, expense) =>
            total + expense.cost * expense.quantity, 0
        );

        const highestExpense = Math.max(...filteredAndSortedExpenses.map(e => e.cost));
        const averageExpense = totalExpenses / filteredAndSortedExpenses.reduce(
            (total, expense) => total + expense.quantity, 0
        );

        return {
            total: totalExpenses,
            highest: highestExpense,
            average: isNaN(averageExpense) ? 0 : averageExpense
        };
    }, [filteredAndSortedExpenses]);

    // Funzione per gestire l'ordinamento
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Funzione per ottenere il corretto indicatore di direzione per l'ordinamento
    const getSortDirection = (name) => {
        if (!sortConfig.key) {
            return '';
        }
        return sortConfig.key === name
            ? sortConfig.direction === 'ascending' ? ' ↑' : ' ↓'
            : '';
    };

    return (
        <section className="bgsect">
            <h2 className="title">Le mie spese</h2>

            <div className="table-toolbar">
                <div className="search-container">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cerca spesa..."
                        className="search-input"
                    />
                    {search && (
                        <button
                            className="clear-search"
                            onClick={() => setSearch('')}
                            aria-label="Cancella ricerca"
                        >
                            ×
                        </button>
                    )}
                </div>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => requestSort('quantity')}>
                                Quantità{getSortDirection('quantity')}
                            </th>
                            <th onClick={() => requestSort('description')}>
                                Descrizione{getSortDirection('description')}
                            </th>
                            <th onClick={() => requestSort('cost')}>
                                Costo{getSortDirection('cost')}
                            </th>
                            <th>Totale</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedExpenses.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="no-results">Nessuna spesa trovata</td>
                            </tr>
                        ) : (
                            filteredAndSortedExpenses.map((expense, index) => (
                                <tr key={index} className="expense-row">
                                    <td>{expense.quantity}</td>
                                    <td>{expense.description}</td>
                                    <td>{expense.cost}€</td>
                                    <td>{expense.cost * expense.quantity}€</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3">Totale</td>
                            <td>{statistics.total}€</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {filteredAndSortedExpenses.length > 0 && (
                <div className="expense-statistics">
                    <div className="stat-item">
                        <span className="stat-label">Spesa più alta:</span>
                        <span className="stat-value">{statistics.highest}€</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Spesa media:</span>
                        <span className="stat-value">{statistics.average.toFixed(2)}€</span>
                    </div>
                </div>
            )}
        </section>
    );
});

export default ExpensesTable;
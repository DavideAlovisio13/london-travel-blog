import React from 'react';
import { expensesData } from '../data/expenses';
import '../styles/components/ExpensesTable.css';

function ExpensesTable() {
  // Calcola il totale delle spese
  const totalExpenses = expensesData.reduce((total, expense) => total + expense.cost, 0);
  
  return (
    <section className="bgsect">
      <h2 className="title">Le mie spese</h2>
      <table>
        <thead>
          <tr>
            <th>Numero</th>
            <th>Descrizione</th>
            <th>Costo</th>
          </tr>
        </thead>
        <tbody>
          {expensesData.map((expense, index) => (
            <tr key={index}>
              <td>{expense.quantity}</td>
              <td>{expense.description}</td>
              <td>{expense.cost}€</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">Totale</td>
            <td>{totalExpenses}€</td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
}

export default ExpensesTable;
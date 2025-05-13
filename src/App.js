import React from 'react';
import Header from './components/Header';
import ExpensesTable from './components/ExpensesTable';
import TodoList from './components/TodoList';
import UsefulInfo from './components/UsefulInfo';
import Footer from './components/Footer';
import './styles/global.css';

function App() {
    return (
        <div className="container">
            <Header />
            <main>
                <div id="lamp"></div>
                <ExpensesTable />
                <TodoList />
                <UsefulInfo />
            </main>
            <Footer />
        </div>
    );
}

export default App;
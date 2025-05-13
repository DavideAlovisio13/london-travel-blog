import React, { Suspense, lazy } from 'react';
import Header from './components/Header';
import LoadingSpinner from './components/common/LoadingSpinner';
import ScrollToTop from './components/common/ScrollToTop';
import './styles/global.css';

// Utilizziamo il lazy loading per componenti più pesanti
const ExpensesTable = lazy(() => import('./components/ExpensesTable'));
const TodoList = lazy(() => import('./components/TodoList'));
const UsefulInfo = lazy(() => import('./components/UsefulInfo'));
const Footer = lazy(() => import('./components/Footer'));
// Componente per la mappa che aggiungeremo
const TravelMap = lazy(() => import('./components/TravelMap'));

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <main>
          <div id="lamp"></div>
          <Suspense fallback={<LoadingSpinner />}>
            <ExpensesTable />
            <TravelMap />
            <TodoList />
            <UsefulInfo />
            <Footer />
          </Suspense>
        </main>
      </div>
      <ScrollToTop />
    </>
  );
}

export default App;
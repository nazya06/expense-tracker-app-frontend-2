import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Login from './auth/Login';
import Register from './auth/Register';
import Transactions from './components/TransactionList';
import Budgets from './components/Budget';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Welcome from './components/Welcome';
import './App.css';
import { BudgetProvider } from './context/BudgetContext';
import { useAuth } from './context/AuthContext'; // ✅ import this

function App() {
  const { currentUser, loading } = useAuth();

  if (loading) return <div>Loading auth...</div>;

  return (
    <BudgetProvider> {/* 👈 Wrap *everything* inside here */}
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Dashboard or Welcome */}
              <Route path="/" element={currentUser ? <Dashboard /> : <Welcome />} />
              
              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/budgets" element={<Budgets />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* 404 catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </BudgetProvider>
  );
}


export default App;

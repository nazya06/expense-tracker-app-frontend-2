import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransactionList from './components/TransactionList';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import NotFound from './components/NotFound';


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/404" element={<NotFound />} />
        </Routes>
      </Router>
  );
}

export default App;
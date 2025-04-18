import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/budgets', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBudgets(response.data);
      } catch (error) {
        console.error('Failed to fetch budgets:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBudgets();
  }, []);

  if (loading) return <div>Loading budgets...</div>;

  return (
    <div className="budget-container">
      <h2>Budget Management</h2>
      {budgets.length === 0 ? (
        <p>No budgets found</p>
      ) : (
        <ul>
          {budgets.map((budget) => (
            <li key={budget.id}>
              <strong>{budget.name}</strong>: {budget.totalAmount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Budget;

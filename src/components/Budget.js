// Budget.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import BudgetForm from './BudgetForm';
import styles from '../styles/BudgetPage.module.scss';

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [message, setMessage] = useState('');


  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const { data } = await axios.get('/api/budgets', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBudgets(data);
    } catch (err) {
      console.error('Failed to fetch budgets:', err);
      setMessage('❌ Failed to fetch budgets');
    }
  };

  // Handle budget creation by adding to the local state
  const handleBudgetCreated = (newBudget) => {
    setBudgets((prevBudgets) => [...prevBudgets, newBudget]);
    setMessage('Бюджет успешно создан!');
  };

  return (
    <div className={styles.budgetContainer}>
      <div className={styles.budgetCard}>
        <h2 className={styles.heading}>💰 Budgets</h2>


        <BudgetForm onBudgetCreated={handleBudgetCreated} />

        {message && <p className={styles.message}>{message}</p>}


        <ul className={styles.budgetList}>
          {budgets.map((budget) => (
            <li key={budget._id}>{budget.name} - ${budget.totalAmount}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Budget;

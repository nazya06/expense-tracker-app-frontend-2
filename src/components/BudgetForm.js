
import { useState } from 'react';
import axios from 'axios';

const BudgetForm = ({ onBudgetCreated }) => {
  const [name, setName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/budgets', { name, totalAmount });
      console.log('Budget created:', response.data);
      onBudgetCreated(response.data); 
      setName('');
      setTotalAmount('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating budget');
    }
  };

  return (
    <div>
      <h2>Создать бюджет</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Название бюджета</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Итого</label>
          <input
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Создать бюджет</button>
      </form>
    </div>
  );
};

export default BudgetForm;

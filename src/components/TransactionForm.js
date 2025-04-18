import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useBudget } from '../context/BudgetContext';


const TransactionForm = ({ onClose, onTransactionCreated }) => {
  const { budgetId } = useBudget();
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: ''
  });

  const [categories, setCategories] = useState([]);
  const [loading] = useState(false);
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem('token');


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };
  
    fetchCategories();
  }, [token]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // const validateForm = () => {
  //   const newErrors = {};
  //   if (!formData.amount || isNaN(formData.amount)) {
  //     newErrors.amount = 'Сумма должна быть числом';
  //   }
  //   if (!formData.type) {
  //     newErrors.type = 'Тип транзакции должен быть обязательным';
  //   }
  //   // if (!formData.category) {
  //   //   newErrors.category = 'Категория должна быть обязательной';
  //   // }
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };


const handleSubmit = async (e) => {
  e.preventDefault();



  try {
    console.log("🚀 Отправка на сервер:", {
      amount: formData.amount,
      type: formData.type,
      CategoryId: formData.category,
      BudgetId: budgetId,
      description: formData.description,
      date: formData.date || new Date()
    });

    const response = await axios.post('/api/transactions', {
      amount: formData.amount,
      type: formData.type,
      CategoryId: formData.category, 
      BudgetId: budgetId,
      description: formData.description,
      date: formData.date || new Date()
    });
    onTransactionCreated(response.data);
    onClose();
  } catch (error) {
    console.error('Error:', error.response?.data);
  }
};

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Добавить транзакцию</h2>
      
      <div style={styles.formGroup}>
        <label>Сумма *</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          step="0.01"
          style={{ ...styles.input, ...(errors.amount && styles.errorInput) }}
        />
        {errors.amount && <span style={styles.errorText}>{errors.amount}</span>}
      </div>

      {/* <div style={styles.formGroup}>
        <label>Тип *</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          style={{ ...styles.select, ...(errors.type && styles.errorInput) }}
        >
          <option value="income">Доход</option>
          <option value="expense">Расход</option>
        </select>
        {errors.type && <span style={styles.errorText}>{errors.type}</span>}
      </div> */}

      <div style={styles.formGroup}>
        <label>Категория *</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={{ ...styles.select, ...(errors.category && styles.errorInput) }}
        >
          <option value="">Выберите категорию</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        {errors.category && <span style={styles.errorText}>{errors.category}</span>}
      </div>

      <div style={styles.formGroup}>
        <label>Описание</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <div style={styles.buttonGroup}>
        <button 
          type="button" 
          onClick={onClose} 
          style={styles.cancelButton}
          disabled={loading}
        >
          Отмена
        </button>
        <button 
          type="submit" 
          style={styles.submitButton}
          disabled={loading}
        >
          {loading ? 'Сохранение...' : 'Сохранить'}
        </button>
      </div>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    maxWidth: '500px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px'
  },
  select: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    fontSize: '16px'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '20px'
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  errorInput: {
    borderColor: '#e74c3c'
  },
  errorText: {
    color: '#e74c3c',
    fontSize: '14px',
    marginTop: '4px'
  }
};

export default TransactionForm;
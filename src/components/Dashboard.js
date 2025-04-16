import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import TransactionForm from './TransactionForm';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      } finally {
        setLoading(false); // Only turn off loading once we're done
      }
    };
  
    fetchTransactions();
  }, []);

  const handleTransactionCreated = (newTransaction) => {
    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Financial Dashboard</h1>
      
      <button 
        onClick={() => setIsModalOpen(true)} 
        style={styles.addButton}
      >
        Add Transaction
      </button>

      {/* Transactions List */}
      <div style={styles.transactionsContainer}>
        <h2>Recent Transactions</h2>
        {loading ? (
          <p>Loading transactions...</p>
        ) : transactions.length === 0 ? (
          <p>No transactions found</p>
        ) : (
          <ul style={styles.transactionList}>
            {transactions.map(transaction => (
              <li key={transaction._id} style={styles.transactionItem}>
<span 
  style={{
    ...styles.transactionAmount,
    color: transaction.type === 'expense' ? '#e74c3c' : '#2ecc71'
  }}
>
  {transaction.type === 'expense' ? '-' : '+'}
  {transaction.amount.toFixed(2)}
</span>
                <span>{transaction.category?.name || 'Uncategorized'}</span>
                {transaction.description && (
                  <p style={styles.transactionDesc}>{transaction.description}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TransactionForm 
          onClose={() => setIsModalOpen(false)}
          onTransactionCreated={handleTransactionCreated}
        />
      </Modal>
    </div>
  );
};

const styles = {
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '20px'
  },
  transactionsContainer: {
    marginTop: '30px',
    borderTop: '1px solid #eee',
    paddingTop: '20px'
  },
  transactionList: {
    listStyle: 'none',
    padding: 0
  },
  transactionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #f0f0f0',
    marginBottom: '5px'
  },
  transactionDesc: {
    color: '#666',
    fontSize: '0.9em',
    margin: '5px 0 0 0'
  },
  transactionAmount: {
    fontWeight: 'bold'
  }
  
};

export default Dashboard;
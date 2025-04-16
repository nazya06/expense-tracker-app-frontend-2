import API from './api';

export const getTransactions = async () => {
  try {
    const response = await API.get('/auth/transactions'); 
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch transactions' };
  }
};


// Function to add a new transaction
export const addTransaction = async () => {
  const transactionData = {
    amount: 100, // Example amount
    description: 'New purchase', // Example description
    // Optionally add categoryId, or omit it if you don't need to assign one
  };

  try {
    const response = await axios.post('http://localhost:5000/api/transactions', transactionData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    console.log('Transaction created:', response.data);
  } catch (error) {
    console.error('Error creating transaction:', error.response?.data || error.message);
  }
};

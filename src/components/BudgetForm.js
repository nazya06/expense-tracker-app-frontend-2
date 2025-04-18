const BudgetForm = () => {
    const [name, setName] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('/api/budgets', { name, totalAmount });
        console.log('Budget created:', response.data);
        // Clear form or redirect user after successful creation
      } catch (err) {
        setError(err.response?.data?.message || 'Error creating budget');
      }
    };
  
    return (
      <div>
        <h2>Create a Budget</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Budget Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Total Amount</label>
            <input
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              required
            />
          </div>
          <button type="submit">Create Budget</button>
        </form>
      </div>
    );
  };
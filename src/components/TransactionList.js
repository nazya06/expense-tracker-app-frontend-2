import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/TransactionList.scss";





const TransactionList = ({ budgetId }) => {
  const [transactions, setTransactions] = useState([]);
  const [CategoryId, setCategoryId] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("DESC");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");


  const fetchTransactions = async () => {
    try {
      const query = {
        dateFrom,
        dateTo,
        sortBy,
        order,
      };
  
      if (selectedCategoryId) {
        query.CategoryId = selectedCategoryId;
      }
  
      const { data } = await axios.get(`/api/transactions/${budgetId}`, {
        params: query,
      });
  
      setTransactions(data);
    } catch (err) {
      console.error("❌ Fetch error:", err);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTransactions();
  };

  useEffect(() => {
    if (budgetId) fetchTransactions();
  }, [budgetId]);

  const [categories, setCategories] = useState([]);

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories"); 
      setCategories(response.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  fetchCategories();
}, []);

  return (
    <div>
      <h2>🧾 Transactions</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <label htmlFor="category">Filter by category:</label>
<select
  id="category"
  value={selectedCategoryId}
  onChange={(e) => setSelectedCategoryId(e.target.value)}
>
  <option value="">All</option>
  {categories.map((cat) => (
    <option key={cat.id} value={cat.id}>
      {cat.name}
    </option>
  ))}
</select>

        
        <label>
          From:
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </label>
        <label>
          To:
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </label>
        <label>
          Sort by:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="createdAt">Date</option>
            <option value="amount">Amount</option>
          </select>
        </label>
        <label>
          Order:
          <select value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="DESC">Descending</option>
            <option value="ASC">Ascending</option>
          </select>
        </label>
        <button type="submit">Apply Filters</button>
      </form>

      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul>
          {transactions.map((tx) => (
            <li key={tx.id}>
              💸 {tx.amount} | 📅 {new Date(tx.createdAt).toLocaleDateString()} | 📂 {tx.CategoryId}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;

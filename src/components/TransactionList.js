import { useState, useEffect } from "react";
import axios from "axios";
import styles from '../styles/TransactionList.module.scss';

const TransactionList = ({ budgetId }) => {
  const [transactions, setTransactions] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("DESC");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const totalAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  const fetchTransactions = async () => {
    try {
      const query = {
        dateFrom,
        dateTo,
        sortBy,
        order,
      };

      if (selectedCategoryId) {
        query.categoryId = selectedCategoryId;
      }

      // const { data } = await axios.get(`/api/transactions/${budgetId}`, {
        const { data } = await axios.get(`/api/transactions/d045146b-885a-41f5-a6aa-39985619abcc`, {  
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
    <div className={styles.transactionContainer}>
      <h2 className={styles.heading}>🧾 Transactions</h2>
      <p className={styles.total}><strong>Total:</strong> {totalAmount.toFixed(2)} ₸</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.field}>
          Category:
          <select
            id="category"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className={styles.select}
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          From:
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className={styles.input}
          />
        </label>

        <label className={styles.field}>
          To:
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className={styles.input}
          />
        </label>

        <label className={styles.field}>
          Sort by:
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.select}
          >
            <option value="createdAt">Date</option>
            <option value="amount">Amount</option>
          </select>
        </label>

        <label className={styles.field}>
          Order:
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className={styles.select}
          >
            <option value="DESC">Descending</option>
            <option value="ASC">Ascending</option>
          </select>
        </label>

        <button type="submit" className={styles.button}>Apply Filters</button>
      </form>

      {transactions.length === 0 ? (
        <p className={styles.noTransactions}>No transactions found.</p>
      ) : (
        <ul className={styles.transactionList}>
          {transactions.map((tx) => (
            <li key={tx.id} className={styles.transactionItem}>
              💸 {tx.amount} | 📅 {new Date(tx.createdAt).toLocaleDateString()} | 📂 {tx.CategoryId}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;

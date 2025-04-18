import { useEffect, useState } from "react";
import axios from "axios";
import { useBudget } from '../context/BudgetContext';
import styles from '../styles/TransactionFilter.module.scss';

const TransactionFilter = ({ onFilterChange, budgetId }) => {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    CategoryId: "",
    dateFrom: "",
    dateTo: "",
    sortBy: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/categories/${budgetId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(response.data);
      } catch (err) {
        console.error("❌ Failed to fetch categories", err);
      }
    };

    if (budgetId) {
      fetchCategories();
    }
  }, [budgetId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className={styles.filterContainer}>
      <h3 className={styles.heading}>Фильтр</h3>

      <label className={styles.field}>
        Категория: 
        <select
          name="CategoryId"
          onChange={handleChange}
          value={filters.categoryId}
          className={styles.select}
        >
          <option value="">все</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        С:
        <input
          type="date"
          name="dateFrom"
          value={filters.dateFrom}
          onChange={handleChange}
          className={styles.input}
        />
      </label>

      <label className={styles.field}>
        По:
        <input
          type="date"
          name="dateTo"
          value={filters.dateTo}
          onChange={handleChange}
          className={styles.input}
        />
      </label>

      <label className={styles.field}>
        Сортировать по:
        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="">умолчанию</option>
          <option value="date">дате</option>
          <option value="amount">сумме</option>
        </select>
      </label>
    </div>
  );
};

export default TransactionFilter;


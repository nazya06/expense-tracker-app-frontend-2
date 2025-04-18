import { useEffect, useState } from "react";
import axios from "axios";
import { useBudget } from '../context/BudgetContext';

const { budgetId } = useBudget();

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
    <div className="filter-container">
      <h3>🔍 Filter Transactions</h3>

      <label>
        Category:
        <select name="CategoryId" onChange={handleChange} value={filters.categoryId}>
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        From:
        <input type="date" name="dateFrom" value={filters.dateFrom} onChange={handleChange} />
      </label>

      <label>
        To:
        <input type="date" name="dateTo" value={filters.dateTo} onChange={handleChange} />
      </label>

      <label>
        Sort By:
        <select name="sortBy" value={filters.sortBy} onChange={handleChange}>
          <option value="">Default</option>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
      </label>
    </div>
  );
};

export default TransactionFilter;

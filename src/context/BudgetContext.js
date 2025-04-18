// BudgetContext.js
import React, { createContext, useContext, useState } from 'react';

const BudgetContext = createContext();

export const useBudget = () => useContext(BudgetContext);

export const BudgetProvider = ({ children }) => {
  const [budgetId, setBudgetId] = useState('d045146b-885a-41f5-a6aa-39985619abcc'); // or get from localStorage

  return (
    <BudgetContext.Provider value={{ budgetId, setBudgetId }}>
      {children}
    </BudgetContext.Provider>
  );
};

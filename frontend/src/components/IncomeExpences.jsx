import React from "react";
export const IncomeExpences = ({ totalIncome, totalExpense }) => {
  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">+${totalIncome}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">-${Math.abs(totalExpense)}</p>
      </div>
    </div>
  );
};

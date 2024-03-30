import React from "react";
export const Balance = ({ totalIncome, totalExpense }) => {
  return (
    <>
      <h4> your Balance</h4>
      <h1> ${totalIncome + totalExpense}</h1>
    </>
  );
};

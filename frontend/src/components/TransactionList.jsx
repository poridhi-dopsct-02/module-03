import React from "react";
import { Transaction } from "./Transaction";
export const TransactionList = ({ transactions, setForceReload }) => {
  return (
    <div>
      <h3>History</h3>
      <ul id="list" className="list">
        {transactions.map((transaction) => (
          <Transaction
            key={transaction.id}
            transaction={transaction}
            setForceReload={setForceReload}
          />
        ))}
      </ul>
    </div>
  );
};

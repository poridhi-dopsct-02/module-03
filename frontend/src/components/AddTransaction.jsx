import React, { useState } from "react";
import { addExpenseRecord } from "../api/apiCaller";

export const AddTransaction = ({ setForceReload }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (title && amount) {
      const newTransaction = {
        title,
        amount: +amount,
      };
      await addExpenseRecord(newTransaction);
      setForceReload((prev) => !prev);
      setAmount(0);
      setTitle("");
    }
  };

  return (
    <div>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount
            <br />
            (negative - expense, positive - income){" "}
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </div>
  );
};

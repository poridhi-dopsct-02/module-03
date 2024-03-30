import React from "react";
import { deleteExpenseRecord } from "../api/apiCaller";

export const Transaction = (props) => {
  const deleteTransaction = async (id) => {
    await deleteExpenseRecord(id);
    props.setForceReload((prev) => !prev);
  };

  const sign = props.transaction.amount < 0 ? "-" : "+";
  const { title } = props.transaction;
  return (
    <li className={props.transaction.amount < 0 ? "minus" : "plus"}>
      {title.charAt(0).toUpperCase() + title.slice(1)}
      <span>
        <p>
          {sign}${Math.abs(props.transaction.amount)}
        </p>
      </span>
      <button
        onClick={() => deleteTransaction(props.transaction.id)}
        className="delete-btn"
      >
        x
      </button>
    </li>
  );
};

import "./App.css";
import { Header } from "./components/Header";
import { Balance } from "./components/Balance";
import { IncomeExpences } from "./components/IncomeExpences";
import { TransactionList } from "./components/TransactionList";
import { AddTransaction } from "./components/AddTransaction";
import { useEffect, useState } from "react";
import { fetchExpenses } from "./api/apiCaller";

function App() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [forceReload, setForceReload] = useState(false);

  const fetchExpenseData = async () => {
    const { totalIncome, transactions, totalExpense } = await fetchExpenses();
    setTotalIncome(totalIncome);
    setTotalExpense(totalExpense);
    setTransactions(transactions);
  };

  useEffect(() => {
    fetchExpenseData();
  }, [forceReload]);

  return (
    <>
      <Header />
      <div className="flex-box">
        <div className="container">
          <Balance totalIncome={totalIncome} totalExpense={totalExpense} />
          <IncomeExpences
            totalIncome={totalIncome}
            totalExpense={totalExpense}
          />
          <TransactionList
            transactions={transactions}
            setForceReload={setForceReload}
          />
        </div>
        <div className="container">
          <AddTransaction setForceReload={setForceReload} />
        </div>
      </div>
    </>
  );
}

export default App;

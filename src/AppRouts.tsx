import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Transactions from "./pages/Transactions";
import TransactionDetails from "./pages/TransactionDetails";

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Transactions />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transactionDetails" element={<TransactionDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;

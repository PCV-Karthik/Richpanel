import './App.css';
import { Route, Routes } from "react-router-dom";
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import SelectionPage from './Pages/SelectionPage';
import PaymentPage from './Pages/PaymentPage';
import PlanPage from './Pages/PlanPage';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" exact element={<SignupPage/>} />
        <Route path="/login" exact element={<LoginPage/>} />
        <Route path="/selection" exact element={<SelectionPage/>} />
        <Route path="/payment" exact element={<PaymentPage/>} />
        <Route path="/plan" exact element={<PlanPage/>} />
      </Routes>
    </>
  );
}

export default App;

import './App.css';
import CustomerList from './components/CustomerList';
import Header from './components/Header';
import Footer from './components/Footer';
import DetailCustomer from './components/DetailCustomer';
import { Route, Routes } from "react-router-dom";
import CreateCustomer from './components/CreateCustomer';
import EditCustomer from './components/EditCustomer';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/detailview/:no" element={<DetailCustomer/>} />
        <Route path="/editcustomer/:no" element={<EditCustomer/>} />
        <Route path="/write" element={<CreateCustomer/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;

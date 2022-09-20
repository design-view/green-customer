import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import DetailCustomer from './components/DetailCustomer';
import { Route, Routes } from "react-router-dom";
import EditCustomer from './components/EditCustomer';
import CustomerContainer from './components/CustomerContainer';
import CrateCustomerContainer from './components/CreateCustomerContainer';
import JoinForm from './components/JoinForm';
import Login from './components/Login';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setLogin } from './modules/logincheck';
import { getCookie } from './util/cookie';
import CreateGallery from './components/CreateGallery';
import GalleryListContainer from './components/GalleryListContainer';


function App() {
  const dispatch = useDispatch();
  const uname = getCookie('username');
  useEffect(()=>{
    if(uname){
      dispatch(setLogin())
    }
  },[])
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<CustomerContainer />} />
        <Route path="/detailview/:no" element={<DetailCustomer/>} />
        <Route path="/editcustomer/:no" element={<EditCustomer/>} />
        <Route path="/write" element={<CrateCustomerContainer/>} />
        <Route path="/join" element={<JoinForm/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/gallery" element={<CreateGallery/>}/>
        <Route path="/gallerylist" element={<GalleryListContainer/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;

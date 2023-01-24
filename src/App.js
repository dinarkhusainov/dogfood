import React, { useState, useEffect } from 'react';

import { Header, Footer, Modal } from './components';
import { Home } from './pages';
import fakeProducts from "../src/assets/data.json";
import Catalog from './pages/Catalog';
import {Api} from "./Api";



function App() {

  const [user, setUser] = useState(localStorage.getItem("sm8"));
  const [token, setToken] = useState(localStorage.getItem("tokensm8"))
  const [ modalActive, setModalActive] = useState(false);
  const [api, setApi] = useState(new Api(token));
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
       api.getProducts()
      .then((resp) => resp.json())
      .then (data => {
        setProducts(data.products);
      })
}, []);

  useEffect(() => {
    setApi(new Api(token));
    setUser(localStorage.getItem("sm8"));
  }, [token])

  useEffect(() => {
    if (!user) {
      localStorage.removeItem("tokensm8");
      setToken (null);
    }
  }, [user])
  

  useEffect(() => {
    if (token) {
      api.getProducts()
      .then((resp) => resp.json())
      .then (data => {
        setProducts(data.products);
      })
    }
  }, [api])

  return (
    
      <div className="wrapper">
        <Header 
          user={user}
          setUser={setUser}
          setModalActive={setModalActive}
          data = {products}
        />
        <main className="content">
          {user ? <Catalog data = {products}  /> : <Home fkprod = {fakeProducts} />}
        </main>
        <Footer />
        <Modal isActive={modalActive} setState={setModalActive} api={api} setToken = {setToken}/>
      </div>
   
  );
}

export default App;

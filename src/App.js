import React, { useState, useEffect } from 'react';
import {Routes, Route } from "react-router-dom"

import { Header, Footer, Modal } from './components';
import { Home, About, Cart, Product, Profile, Catalog} from './pages';
import fakeProducts from "../src/assets/data.json";
import {Api} from "./Api";
import Ctx from "./Ctx"; 



function App() {
 
  const [user, setUser] = useState(localStorage.getItem("sm8"));
  const [token, setToken] = useState(localStorage.getItem("tokensm8"))
  const [ modalActive, setModalActive] = useState(false);
  const [api, setApi] = useState(new Api(token));
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(products);
  
  
  useEffect(() => {
    api.getProducts()
      .then((res) => res.json())
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
      .then(res => res.json())
      .then (data => {
        setProducts(data.products);
      })
    }
  }, [api])


  useEffect(()=>{
    setVisibleProducts(products);
  },[products])

  return (
    <Ctx.Provider value={{
      user: user,
      token: token,
      api: api,
      setUser: setUser,
      setToken: setToken,
      setApi: setApi
    }}>    
      <div className="wrapper">
        <Header 
          setModalActive={setModalActive}
          products = {products}
          searchProducts={setVisibleProducts}
        />
        <main className="content">
          <Routes>
            <Route path='/' element={<Home fkprod = {fakeProducts} />}/>
            <Route path='/catalog' element= {<Catalog data = {visibleProducts} />}/>
            <Route path='/profile' element= {<Profile />}/>
            <Route path='/catalog/:id' element= {<Product />}/>
            <Route path='/cart' element= {<Cart />}/>
            <Route path='/about' element= {<About />}/>
          </Routes>
         
        </main>
        <Footer />
        <Modal isActive={modalActive} setState={setModalActive} />
      </div>
    </Ctx.Provider>
   
  );
}

export default App;

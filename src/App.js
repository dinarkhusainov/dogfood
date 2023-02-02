import React, { useState, useEffect } from 'react';
import {Routes, Route } from "react-router-dom"

import { Header, Footer, Modal } from './components';
import { Home, About, Cart, Product, Profile, Catalog} from './pages';
import fakeProducts from "../src/assets/data.json";
import {Api} from "./Api";
import Ctx from "./Ctx"; 
import AddForm from './pages/AddForm';


const PATH = "/"
// const PATH = "/dogfood/";

function App() {
  let usr = localStorage.getItem("sm8");
  if (usr) {
    usr = JSON.parse(usr);
  }
  const [user, setUser] = useState(usr);
  const [token, setToken] = useState(localStorage.getItem("tokensm8"))
  const [ modalActive, setModalActive] = useState(false);
  const [api, setApi] = useState(new Api(token));
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(products);
  
  
  useEffect(() => {
    if (token) {
    api.getProducts()
      .then((res) => res.json())
      .then (data => {
        setProducts(data.products);
      })
    }
  }, []);

  useEffect(() => {
    setApi(new Api(token));
    let usr = localStorage.getItem("sm8");
    if (usr) {
      usr = JSON.parse(usr);
    }
    setUser(usr);
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
      modalActive: modalActive,
      products: products, 
      visibleProducts: visibleProducts,
      setUser: setUser,
      setToken: setToken,
      setApi: setApi,
      setModalActive: setModalActive,
      setProducts: setProducts,
      setVisibleProducts: setVisibleProducts,
      PATH: PATH
    }}>    
      <div className="wrapper">
        <Header />
        <main className="content">
          <Routes>
            <Route path={PATH} element={<Home fkprod = {fakeProducts} />}/>
            <Route path={PATH + 'catalog'} element= {<Catalog />}/>
            <Route path={PATH + 'profile'} element= {<Profile />}/>
            <Route path={PATH + 'catalog/:id'} element= {<Product />}/>
            <Route path={PATH + 'cart'} element= {<Cart />}/>
            <Route path={PATH + 'about'} element= {<About />}/>
            <Route path={PATH + 'add' } element={<AddForm />}/>
          </Routes>
         
        </main>
        <Footer />
        <Modal isActive={modalActive} setState={setModalActive} />
      </div>
    </Ctx.Provider>
   
  );
}

export default App;

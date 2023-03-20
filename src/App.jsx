import React, { useState, useEffect } from 'react';
import {Routes, Route } from "react-router-dom"

import { Header, Footer, Modal } from './components';
import { Home, About, Basket, Product, Profile, Catalog, Favorites, AddForm, Help} from './pages';

import {Api} from "./Api";
import Ctx from "./Ctx"; 

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
  const [favorites, setFavorites] = useState ([]);
  const [basket, setBasket] = useState(localStorage.getItem("basket8") ? JSON.parse(localStorage.getItem("basket8")): [])
  const [gds, setGds] = useState([]);
  const [users, setUsers] =useState ([]);
  const [product, setProduct] = useState({});
  const [input, setInput] = useState('')
  
  useEffect(() => {
    if (token) {
    api.getProducts()
      .then((res) => res.json())
      .then (data => {
        setProducts(data.products);
        setVisibleProducts(data.products);
      })
    }
  }, []);

  useEffect(() => {
    if (token) {
    api.getUsers()
      .then((res) => res.json())
      .then (data => {
        setUsers(data);
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
        setVisibleProducts(data.products);
        setProducts(data.products);
      })
    }
  }, [api])

  useEffect(()=>{
    setFavorites(products.filter(el => {
      return el.likes && el.likes.includes(user._id)}))
  },[products])

  useEffect(()=> {
    localStorage.setItem("basket8", JSON.stringify(basket));
  }, [basket])

  useEffect(() => {
    let arr = [];
    if (products.length) {
        basket.forEach(el => {
            arr.push(products.filter(g => g._id === el.id)[0])
        })
    }
    setGds(arr);
  }, [basket, products])

  return (
    <Ctx.Provider value={{
      user: user,
      token: token,
      api: api,
      modalActive: modalActive,
      products: products, 
      visibleProducts: visibleProducts,
      favorites: favorites,
      basket:basket,
      gds:gds,
      users:users,
      product,
      input,
      setUser: setUser,
      setToken: setToken,
      setApi: setApi,
      setModalActive: setModalActive,
      setProducts: setProducts,
      setVisibleProducts: setVisibleProducts,
      setFavorites: setFavorites,
      setBasket:setBasket,
      setGds:setGds,
      setUsers: setUsers,
      setProduct,
      setInput,
      PATH: PATH,

    }}>    
      <div className="wrapper">
        <Header />
        <main className="content">
          <Routes>
            <Route path={PATH + "dogfood"} element={<Home />}/>
            <Route path={PATH + 'catalog'} element= {<Catalog />}/>
            <Route path={PATH + 'profile'} element= {<Profile />}/>
            <Route path={PATH + 'catalog/:id'} element= {<Product />}/>
            <Route path={PATH + 'basket'} element= {<Basket />}/>
            <Route path={PATH + 'about'} element= {<About />}/>
            <Route path={PATH + 'add' } element={<AddForm />}/>
            <Route path={PATH + 'favorites' } element={<Favorites />}/>
            <Route path={PATH + 'help' } element={<Help />}/>
          </Routes>
         
        </main>
        <Footer />
        <Modal isActive={modalActive} setState={setModalActive} />
      </div>
    </Ctx.Provider>
   
  );
}

export default App;

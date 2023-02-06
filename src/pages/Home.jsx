import React from 'react'
import Promo from '../components/Promo/Promo'
import { Link } from 'react-router-dom';

function Home() {
  
  return ( 
    <div className="container">
      <Link to='/catalog'><h2> Каталог товаров </h2></Link>
      <Promo />
    </div>
  )
}

export default Home;
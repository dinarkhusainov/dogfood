import React from 'react'
import Card from '../components/Card/Card';
import Promo from '../components/Promo/Promo'
import { Link } from 'react-router-dom';

function Home({fkprod}) {
  
  return ( 
    <div className="container">
      <Link to='/catalog'><h2> Каталог товаров </h2></Link>
      <Promo />
      <h2 className="content__title"> Хиты продаж  </h2>
      <div className="content__items">
      {fkprod.map ((el, i)=> <Card 
                        key={"card_" + i} 
                        productName={el.name} 
                        price={el.price} 
                        discount={el.discount}
                        wight={el.wight}
                        description={el.description}
                        isCart={el.isCart}
                        available={el.available}
                        stock={el.stock}
                        pictures={el.pictures}
                        tags={el.tags}
                    />)}
      </div>
    </div>
  )
}

export default Home;
import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import Ctx from '../Ctx'

import imgCart from "../assets/img/empty-cart.png"

function Cart() {

  const {products} = useContext(Ctx);
  return (
    <div className='cart__container'>
      <h3> Ваша корзина пуста </h3>
      <Link to='/catalog'><h2> Перейти к покупкам </h2></Link>
      <img className='cart__img' src={imgCart} alt="корзина" />
    </div>
  )
}

export default Cart
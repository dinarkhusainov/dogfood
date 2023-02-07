import React, {useContext } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap' 
import Ctx from '../Ctx'
import Row from "../components/Row/row"

import imgBasket from "../assets/img/empty-cart.png"

function Basket() {
  const {basket, PATH, gds} = useContext(Ctx);

  return ( 
    <div className="container">
      <Link to={PATH +'catalog'}><h2> Вернуться к покупкам </h2></Link>
        {basket.length > 0 && gds.length > 0 && <Table hover>
            <thead>
                <tr>
                    <th>Изображение</th>
                    <th>Название</th>
                    <th>Количество</th>
                    <th>Цена</th>
                </tr>
            </thead>
            <tbody>
                {basket.map((el, i) => <Row key={el.id} {...gds[i]} {...el} />)}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={3} className="text-end fw-bold fs-3">ИТОГО:</td>
                    <td className="fw-bold fs-3">
                        {basket.reduce((acc, el, i) => {
                            acc += el.cnt * gds[i].price;
                            return acc;
                        }, 0)}₽
                    </td>
                </tr>
            </tfoot>
        </Table>}

      {basket.length === 0 && 
        <div className='cart__container'>
          <h3> Ваша корзина пуста </h3>
          <img className='cart__img' src={imgBasket} alt="корзина" />
        </div>}
    </div>
  
  )
}

export default Basket;
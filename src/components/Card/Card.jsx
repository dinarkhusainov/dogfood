import React, {useContext, useState, useEffect} from "react";
import Ctx from "../../Ctx";

function Card({name, price, discount, wight, likes, isCart, _id, available, stock, pictures, tags}) {
  const {user, setFavorites, setProducts, api, setBasket, setVisibleProducts} =useContext(Ctx);
  const [like, setLike] = useState(likes && likes.includes(user._id));
  const [flag, setFlag] = useState(false);

  const update = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setFlag(true);
    setLike(!like); 
      api.setLike(_id, like) 
        .then(res => res.json())
        .then(data => {
            setFavorites(prev => {
                let arr = prev.filter(el => el._id === _id);
                return arr.length > 0 ? 
                    prev.filter(el => el._id !== _id) : 
                    [...prev, data]
            })
            setProducts(prev => prev.map(el => {
              if (el._id === data._id){
                return data;
              } else {
                return el;
              }
            }));
            setVisibleProducts(prev => prev.map(el => {
              if (el._id === data._id){
                return data;
              } else {
                return el;
              }
            }))
            
        })
}

const buy = (e) => {
  e.stopPropagation();
  e.preventDefault();
  setBasket(prev => {
    const test = prev.filter(el => el.id === _id)
    if (test.length) {
      return prev.map(el=> {
        if (el.id === _id) {
          el.cnt++
        } 
        return el;
      })
    } else {
       return [...prev,{id: _id, cnt: 1}]
    }
  })

  }



return (
    <div className="product-block">
        <span className="product-block__heart" onClick={update}>
            {   like 
                ? <i className="fa-solid fa-heart"></i>
                : <i className="fa-regular fa-heart"></i>
            }
        </span>
        <img
          className="product-block__image"
          src={pictures}
          alt="product"
        />
        <h4 className="product-block__title">{name}</h4>
        {discount > 0 && <p className="product-block__discount">Скидка {discount} %</p>}
        <p> Вес: {wight} </p>
        {isCart&&<p> В корзине</p>}
        {available && <p> Есть на складе </p>}
        {stock>0 && <p> Остаток {stock} шт. </p>}
        <p></p>
        <div className="product-block__bottom">
        {discount > 0 ? <div className="product-block__price"><p> <s> {price} ₽</s></p>
          <h2>{Math.round(price- price*discount/100)} ₽</h2></div> : <h2>{price} ₽</h2>} 
          
            <button className="button button--outline button--add" onClick={buy}>
                <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
              </svg>
              <span>Добавить</span>
              <i></i>
            </button>
          </div>
      </div>
)
}

export default Card
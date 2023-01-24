import React from 'react'
import { Categories, SortPopup } from '../components';
import Card from '../components/Card/Card';


function Home({fkprod}) {
  
  return ( 
    <div className="container">
      <div className="content__top">
        <Categories onClickItem={(name)=> alert (name)} items={['Говядина', 'Птица',  'Свинина', 'Овощи', 'Другое']} />
        < SortPopup items={['популярности', 'цене', 'алфавиту']}/>
      </div>
      <h2 className="content__title"> Все товары  </h2>
      <div className="content__items">
      {fkprod.map ((el, i)=> <Card 
                        key={"card_" + i} 
                        productName={el.name} 
                        price={el.price} 
                        discount={el.discount}
                        wight={el.wight}
                        description={el.description}
                        like={el.isFavorite}
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
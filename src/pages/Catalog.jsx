import React from "react";
import { Categories, SortPopup } from "../components";
import Card from "../components/Card/Card";
import { Link } from "react-router-dom";
import searhNullPng from "../assets/img/searchNull.png"


function Catalog({data, user}) {
    const clearSearch = () => {
        console.log('clear')
        //updateText("");
        //setSearchData(data);
    }

    return (<>
        {data.length>0 ? <div className="container">
            <div className="content__top">
              <Categories onClickItem={(name)=> alert (name)} items={['Говядина', 'Птица',  'Свинина', 'Овощи', 'Другое']} />
              < SortPopup items={['популярности', 'цене', 'алфавиту']}/>
            </div>
            <h2 className="content__title"> Все товары </h2>
            <div className="content__items">
                    {data && data.map ((el, i)=> <Link to={`/catalog/${el._id}`} key={el._id}>
                    <Card 
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
                    /></Link>)}
            </div>
        </div> 
        : 
        <div className="searchNull__container">
            <h3> Извините, по вашему запросу ничего не найдено</h3>
            <Link to='/' onClick={clearSearch}> <h2> Перейти к покупкам </h2></Link>
            <img className='searchNull__img' src={searhNullPng} alt="Товаров не найдено" />

        </div>
        }
        </>
    )
}

export default Catalog;
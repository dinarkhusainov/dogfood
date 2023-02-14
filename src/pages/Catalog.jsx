import React, {useContext} from "react";
import { ButtonMy, Categories, SortPopup } from "../components";
import Card from "../components/Card/Card";
import { Link } from "react-router-dom";
import searchNullPng from "../assets/img/searchNull.png"
import Ctx from "../Ctx";
import Pagination from "../components/Pagination/Pagination";
import usePagination from "../hooks/usePagination";


function Catalog() {
    const { visibleProducts, PATH, user, setModalActive } = useContext(Ctx);
    const paginate = usePagination(visibleProducts, 12)
    const logIn = (e) => {
        e.preventDefault();
        setModalActive(prev => !prev);
      }
    const clearSearch = () => {
        console.log('clear')
        //updateText("");
        //setVisibleProducts (visibleProducts);
    }

    return <>
        {user && <>
        { visibleProducts.length>0 
            ? <div className="container">
                <div className="content__top">
                    <Categories onClickItem={(name)=> alert (name)} items={['Говядина', 'Птица',  'Свинина', 'Овощи', 'Другое']} />
                    < SortPopup items={['популярности', 'цене', 'алфавиту']}/>
                </div>
                <div className="add__product">
                    <h2>Все товары</h2>
                    <Pagination hook={paginate} />
                    <Link to={PATH +'add'}> <ButtonMy className="button"> Добавить товар </ButtonMy></Link>
                </div>
                <div className="content__items">
                        {paginate.setPageData().map ((el, i)=> 
                        <Link to={PATH + `catalog/${el._id}`} key={el._id}>
                            <Card key={"card_" + i} {...el}/>
                        </Link>)}
                </div>
            </div> 
            : <div className="searchNull__container">
                <h3> Извините, по вашему запросу ничего не найдено</h3>
                <Link to={PATH} onClick={clearSearch}> <h2> Перейти к покупкам </h2></Link>
                <img className='searchNull__img' src={searchNullPng} alt="Товаров не найдено" />
            </div>
        }
    </>}
    
    { !user && 
        <div className="searchNull__container">
            <h3> Извините, вы не авторизовались </h3>
            <Link><h2 onClick={logIn} > Войти / Зарегистрироваться </h2></Link>
            <Link to={PATH}> <h2> Перейти на главную страницу </h2></Link>
            <img className='searchNull__img' src={searchNullPng} alt="Товаров не найдено" />
        </div> 
    }
    </>
}  

export default Catalog;
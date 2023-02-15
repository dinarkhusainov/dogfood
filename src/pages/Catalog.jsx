import React, {useContext, useEffect, useState} from "react";
import { ButtonMy } from "../components";
import Card from "../components/Card/Card";
import { Link } from "react-router-dom";
import searchNullPng from "../assets/img/searchNull.png"
import Ctx from "../Ctx";
import Pagination from "../components/Pagination/Pagination";
import usePagination from "../hooks/usePagination";
import { SortDown, SortDownAlt } from "react-bootstrap-icons";


function Catalog() {
    const { visibleProducts, PATH, user, setModalActive, setVisibleProducts, setInput, products} = useContext(Ctx);
    const [sortProducts, setSortProducts] = useState(visibleProducts);
    const paginate = usePagination(sortProducts, 12)
    const logIn = (e) => {
        e.preventDefault();
        setModalActive(prev => !prev);
      }
    const clearSearch = () => {
        setInput("");
        setVisibleProducts (products);
    }


    const [btnType, setBtnType] = useState("");
   
    const updSort = (e) => {
        let el = e.currentTarget;
        let flag = false;
        if (el.classList.contains("active")) {
            el.classList.remove("active");
            setBtnType("");
            flag = true;
        } else {
            el.classList.add("active");
            setBtnType(el.title);
        }
        if (flag) {
            setSortProducts(visibleProducts);
        } else {
            let data = [...visibleProducts];
            switch (el.title) {
                case "down": 
                    data.sort((a,b) => a.price - b.price);
                    break;
                case "up": 
                    data.sort((a,b) => b.price - a.price);
                    break;
                case "new": 
                    data = data.filter(d => d.tags.includes("new"));
                    break;
                case "sale": 
                    data = data.filter(d => d.discount > 0);
                    break;
            }
            setSortProducts(data);
        }
    }

    useEffect(() => {
        if (sortProducts.length === 0) {
            setSortProducts(visibleProducts);
        }
    }, [visibleProducts]); 

    return <>
        {user && <>
        { visibleProducts.length>0 
            ? <div className="container">
                <div className="content__top">
                    <div className="categories">
                        <ul>
                            <li className={`${btnType === "new" ? "active" : ""}`} title="new" onClick={updSort}>Новинки</li>
                            <li className={` ${btnType === "sale" ? "active" : ""}`} title="sale" onClick={updSort}>Скидка</li>
                            <li className={`btn ${btnType === "down" ? "active" : ""}`} title="down" onClick={updSort}> Цена <SortDownAlt /></li>
                            <li className={`btn ${btnType === "up" ? "active" : ""}`} title="up" onClick={updSort}> Цена <SortDown /></li>
                        </ul>
                    </div>
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
                <Link to={PATH + "catalog"} onClick={clearSearch}> <h2> Перейти к покупкам </h2></Link>
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
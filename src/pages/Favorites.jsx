import React, {useContext} from "react";
import Card from "../components/Card/Card";
import { Link } from "react-router-dom";
import FavoriteJpg from "../assets/img/favorites2.jpg"
import Ctx from "../Ctx";
import Pagination from "../components/Pagination/Pagination";
import usePagination from "../hooks/usePagination";


function Favorites () {
    const { favorites, PATH} = useContext(Ctx);
    const paginate = usePagination(favorites, 12)
    

    return <>
        {favorites.length>0 
        
            ? <div className="container">
                <Link to={PATH +'catalog'}><h2> Вернуться к покупкам </h2></Link>
                <Pagination hook={paginate} />
                <div className="add__product">
                
                    
                </div>
                <div className="content__items">
                    {paginate.setPageData().map ((el, i)=> 
                    <Link to={PATH + `catalog/${el._id}`} key={el._id}>
                        <Card key={"card_" + i} {...el}/> 
                    </Link>)}
                </div>
            </div> 
            : <div className="searchNull__container">
                <h3> Извините, список ваших любимых товаров пуст</h3>
                <Link to={PATH+ "catalog"}> <h2> Перейти к товарам </h2></Link>
                <img className='searchNull__img' src={FavoriteJpg} alt="Любимых товаров не найдено" />
            </div>
        }
    
    
   
    </>
}  

export default Favorites;
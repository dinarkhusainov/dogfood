import React, {useState, useEffect, useContext} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Trash3 } from 'react-bootstrap-icons';
import Review from '../components/ProductDetail/Review';
import Ctx from '../Ctx';


const Product = () => {
    const {api, PATH, user, setProducts } = useContext(Ctx)
    const navigate = useNavigate();
    const {id} = useParams();
    const [product, setProduct] = useState({});
    
    useEffect(() => {
        api.getProduct(id)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                console.log(data.reviews)
            })
    }, []);

    const remove = () => {
        api.delProduct(id) 
            .then(res => res.json())
            .then(data => {
                if(!data.error) {
                    setProducts(prev => prev.filter(g =>g._id !==data._id))
                    navigate(`${PATH}catalog`);
                }
            })
        }

    const btnSt = {
        position: "absolute",
        right: "130px",
        top: "210px"
    }

    return (
        <div className="container">
            <Link to={PATH + 'catalog'}><h2>  Вернуться к покупкам </h2></Link>
            <div className="container product-block">
                {product && product.author && product.author._id === user._id &&<button 
                className="button" 
                onClick={remove}
                style={btnSt}> 
                <Trash3 /></button>}
                <img
                    className="product-block__image"
                    src={product.pictures}
                    alt="product"
                />
                
                <h2>{product.name || "Страница товара"}</h2> 
                <p>{product.description} </p>
                <div className="product-block__bottom">
                    <div className="product-block__price">{product.price} ₽ </div>
                    <div className="button button--outline button--add">
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
                        <i>2</i>
                    </div>
                </div>
                <div className='reviews'>
                    <h3>Отзывы</h3>
                    {product.reviews && product.reviews.length >0 && 
                    product.reviews.map((el, i) => <Review {...el} key={i}/>)}
                </div>
            </div>
        </div>
    )
}

export default Product

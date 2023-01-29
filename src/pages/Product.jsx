import React, {useState, useEffect, useContext} from 'react'
import { useParams, Link } from 'react-router-dom'
import Review from '../components/ProductDetail/Review';
import Ctx from '../Ctx';


const Product = () => {
const {api} = useContext(Ctx)

    const {id} = useParams();
    const [product, setProduct] = useState({});
    
    useEffect(() => {
        api.getProduct(id)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            })
    }, []);

    return (
        <>
            <Link to="/catalog">Назад</Link>
            <h2>{product.name || "Страница товара"}</h2>
            <h3>Отзывы</h3>
            <div className='reviews'>
                {product.reviews && product.reviews.length >0 && 
                product.reviews.map((el, i) => <Review {...el} key={i}/>)}
            </div>
        </>
    )
}

export default Product

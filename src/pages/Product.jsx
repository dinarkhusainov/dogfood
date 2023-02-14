import React, {useState, useEffect, useContext} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Trash3 } from 'react-bootstrap-icons';
import Review from '../components/ProductDetail/Review';
import Ctx from '../Ctx';
import { ButtonMy } from '../components';


const Product = () => {
    const {api, PATH, user, setProducts } = useContext(Ctx)
    const navigate = useNavigate();
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(5);

    
    useEffect(() => {
        api.getProduct(id)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            })
    }, []);

    const remove = () => {
        // alert("Вы действительно хотите удалить товар?")
        api.delProduct(id) 
            .then(res => res.json())
            .then(data => {
                if(!data.error) {
                    setProducts(prev => prev.filter(g =>g._id !==data._id))
                    navigate(`${PATH}catalog`);
                }
            })
        }
    const sendReview = (e) => {
        e.preventDefault();
        let body = {
            text: review,
            rating: rating
        }
        api.addReview(id, body)
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                setProduct(data);
                clear();}
            }
        )}
        
    const clear = (e) => {
        setRating(5);
        setReview("")
    }

    const btnSt = {
        position: "absolute",
        right: "130px",
        top: "210px"
    }

    return (<>
        <div className="container">
            <Link to={PATH + 'catalog'}><h2>  Вернуться к покупкам </h2></Link>
            <div className="container product__about">
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
                <p> Доступно {product.available} F/tr </p>
                <p> Остаток {product.stock} шт. </p>
                <div className="product-block__bottom">
                    <div className="product-block__price">{product.price} ₽ </div>
                </div>
            </div>
            <div className='review__container'>
                <h2>Оставить отзыв</h2>
                <form onSubmit={sendReview}>
                    <select className='add__input'
                        type="number"
                        onChange={e => setRating(e.target.value)}> 
                            <option value={5}>5 звезд</option>
                            <option value={4}>4 звезды</option>
                            <option value={3}>3 звезды</option>
                            <option value={2}>2 звезды</option>
                            <option value={1}>1 звезда</option>
                    </select>
                    <textarea className='add__input' 
                        rows="4"
                        type="text" 
                        placeholder='Ваш отзыв'
                        required
                        value={review}
                        onInput={e => setReview(e.target.value)}
                    />
                        <ButtonMy type="submit">Добавить отзыв </ButtonMy>
                    </form>
                    <h3>Отзывы</h3>
                    {product.reviews && product.reviews.length >0 && 
                    product.reviews.map((el, i) => <Review {...el} key={i}/>)}
                </div>
            </div>
       </>
    )
}

export default Product;

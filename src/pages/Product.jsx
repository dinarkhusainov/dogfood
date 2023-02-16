import React, {useState, useEffect, useContext} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Trash3 } from 'react-bootstrap-icons';
import Review from '../components/ProductDetail/Review';
import Ctx from '../Ctx';
import { ButtonMy } from '../components';


const Product = () => {
    const {api, PATH, user, setProducts, product, setProduct, setBasket } = useContext(Ctx)
    const navigate = useNavigate();
    const {id} = useParams();
    
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

    const buy = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setBasket(prev => {
          const test = prev.filter(el => el.id === product._id)
          if (test.length) {
            return prev.map(el=> {
              if (el.id === product._id) {
                el.cnt++
              } 
              return el;
            })
          } else {
             return [...prev,{id: product._id, cnt: 1}]
          }
        })
      
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
                    {product.discount > 0 ? <div className="product-block__price"><p> <s> {product.price} ₽</s></p>
                    <h2>{Math.round(product.price- product.price*product.discount/100)} ₽</h2></div> : <h2>{product.price} ₽</h2>} 
                </div>
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
                    product.reviews.map((el, i) => <Review {...el} id={id} key={i}/>)}
                </div>
            </div>
       </>
    )
}

export default Product;

import React, {useContext, useState} from "react";
import { useNavigate } from "react-router";
import Ctx from "../Ctx";
import { Button } from "../components";

const AddForm = () =>  {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(100);
    const [wight, setWight] = useState("");
    const [stock, setStock] = useState(10);
    const [discount, setDiscount] = useState(0);
    const [description, setDescription] = useState("");
    const [pictures, setPictures] = useState("");

    const {api, PATH, setProducts} = useContext(Ctx);
    const navigate = useNavigate();
     const handler = (e) => {
        e.preventDefault();
        let body = {
            name: name || "Название отсутствует",
            price: price || 0,
            wight: wight || "unknown",
            stock: stock || 0,
            description: description || "Тут скоро появится описание товара",
            discount: discount,
            pictures: pictures
        }
        console.log(body);
        api.addProduct(body)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (!data.error) {
                    setProducts(prev => [...prev, data]);
                    clear();
                    navigate(`${PATH}catalog/${data._id}`);
                }
            })
    }
    const clear = (e) => {
        setName("");
        setPrice(100);
        setWight("");
        setDiscount(0);
        setStock(10);
        setDescription("");
        setPictures("");
    }
    return (<div className="container">
        <h2>Добавление товара</h2>
        <form className="add__container"  onSubmit={handler}>  
            <img
                className="add-block__image"
                src= {pictures ? 
                pictures : 
                "https://www.chanchao.com.tw/images/default.jpg"}
                alt="product"
             />  
            <p>Название товара</p>
            <input className='add__input' 
                type="text"
                placeholder='Куриные лапы'
                required
                value={name}
                onChange={e => setName(e.target.value)}  
            />
            <p>Цена</p>
            <input className='add__input' 
                type="number"
                placeholder='100'
                required
                value={price}
                onChange={e => setPrice(e.target.value)}  
                step="10"
                min={0}
            />
            <p>Вес</p>
            <input className='add__input' 
                type="text"
                placeholder='100 г'
                value={wight}
                onChange={e => setWight(e.target.value)}  
            />
            <p>Скидка</p>
            <select className='add__input' 
                type="text"
                onChange={e => setDiscount(e.target.value)}> 
                    <option value={0}>Без скидки</option>
                    <option value={5}>5%</option>
                    <option value={10}>10%</option>
                    <option value={15}>15%</option>
                    <option value={20}>20%</option>
                    <option value={25}>25%</option>
            </select>
            <p>Количество</p>
            <input className='add__input' 
                type="number"
                placeholder='10'
                value={stock}
                onChange={e => setStock(e.target.value)}
                min={0}               
            /> 
            <p>Изображение</p>
            <input className='add__input' 
                type="url"
                placeholder='https://www.chanchao.com.tw/images/default.jpg'
                required
                value={pictures}
                onChange={e => setPictures(e.target.value)}               
            />
            <p>Описание</p>
            <textarea className='add__input' 
                rows="4" 
                type="text"
                placeholder='Описание товара'
                value={description}
                onChange={e => setDescription(e.target.value)}               
            />
            <Button type="submit">Добавить</Button>
        </form>
    </div>
    )
}

export default AddForm

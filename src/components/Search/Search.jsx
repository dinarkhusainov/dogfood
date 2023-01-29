import React, { useState } from "react"
import { useNavigate } from "react-router-dom";


function Search ({products, searchProducts}) {
    const navigate = useNavigate();
    const [input, setInput] = useState('')
    const [searchData, setSearchData] = useState(products);
    const search = (e) => {
        navigate ('/catalog');
        setInput(e.target.value);
        let array = products.filter(el=>el.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setSearchData(array);
        searchProducts(array);
    }


    
    return (
        <div className='header__search'>
            <div className="search__placeholder">
                <input type="search" placeholder='Найти' value={input} onChange={search} />
            </div>
            {input && <div className="search__result"> 
                Найдено {searchData.length} товаров            
            </div>}
       </div>        
    )
    

}
export default Search;
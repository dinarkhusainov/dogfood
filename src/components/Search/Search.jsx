import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import Ctx from "../../Ctx";



function Search () {
    const navigate = useNavigate();
    const {products, setVisibleProducts, input, setInput, PATH} = useContext(Ctx);
    
    const [searchData, setSearchData] = useState(products);
    const search = (e) => {
        navigate (PATH + 'catalog');
        setInput(e.target.value);
        let array = products.filter(el=>el.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setSearchData(array);
        setVisibleProducts(array);
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
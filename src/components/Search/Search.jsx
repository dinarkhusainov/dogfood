import React, { useState } from "react"


function Search ({data}) {
    const [input, setInput] = useState('')
    const [searchData, setSearchData] = useState(data);
    const search = (e) => {
        setInput(e.target.value);
        let array = data.filter(el=>el.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setSearchData(array);
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
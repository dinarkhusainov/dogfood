import React from 'react';

function Pagination  ({hook})  {
    const max = hook.maxPage;
    const current = hook.currentPage;
    const pages = [];
    for (let a = 0; a<max; a++) {
        pages.push(a+1)
    }
    return <div className='page-container'>
        <button className='page' disabled={current === 1} onClick={hook.previous}><i className="fa-solid fa-dog rotate"></i> </button>
        {pages.map(p=><button key={p} 
            className='page' 
            style={{backgroundColor: p===current && "#fe5f1e",
            color: p === current && "white"}} onClick={e => {hook.step(p)}}
        >{p}</button>)}
        <button className='page' disabled={current === max} onClick={hook.next}><i className="fa-solid fa-dog"></i> </button>
    </div>
  
}

export default Pagination
import React from 'react'
import "./promo.css"
import helpjpg from "../../assets/img/help.jpg"
import newProd from "../../assets/img/promo.jpg"
import inst from "../../assets/img/inst.jpg"
import promo from "../../assets/img/promokat.png"
import { Link } from 'react-router-dom'

export default function Ads() {
  return ( <>
  <Link to='/catalog'>
    <div className='promo'>
      <img  src={promo} alt="instagram" />
    </div>
  </Link>
  <Link to='/help'>
    <div className='promo'>
      <img  src={helpjpg} alt="Help for animals" />
    </div>
  </Link>
  <Link to='/catalog'>
    <div className='promo'>
      <img  src={newProd} alt="new products" />
    </div>
  </Link>
  <div className='promo'>
    <iframe width="100%" height="350px" src="https://www.youtube.com/embed/mzWAVovs0Qk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </div>
  <Link to='/about'>
    <div className='promo'>
      <img  src={inst} alt="instagram" />
    </div>
  </Link>
  </>)
}

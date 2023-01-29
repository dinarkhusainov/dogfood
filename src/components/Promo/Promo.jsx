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
  <Link to='/catalog'>
    <div className='promo'>
      <img  src={helpjpg} alt="Help for animals" />
    </div>
  </Link>
  <Link to='/catalog'>
    <div className='promo'>
      <img  src={newProd} alt="new products" />
    </div>
  </Link>
  <Link to='/about'>
    <div className='promo'>
      <img  src={inst} alt="instagram" />
    </div>
  </Link>
  </>)
}

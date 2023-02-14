import React from 'react';
import { Link } from 'react-router-dom';


function Footer () {

    return (
      <footer className="footer">
        <h2> Мы всегда вам рады </h2>
        <div className="footcontainer">
          <Link to='/about'><i className="fa-solid fa-phone"> 8 800 2000 600</i></Link>
          <Link to='/about'><i className="fa-brands fa-instagram"> DogFood</i></Link>
          <Link to='/about'><i className="fa-brands fa-vk"> vk.ru/DogFood</i></Link>
        </div>
      </footer>
    )
}

export default Footer;
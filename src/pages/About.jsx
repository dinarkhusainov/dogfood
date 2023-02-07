import React from 'react'

function About() {
  return (
  <div className="container">
    <h2>О компании </h2>
    <h4>Зоомагазин DogFood - это удобный формат интернет-магазина, в котором вы с легкостью найдете лакомство для своего любимца.</h4> 
     <h4> Так же вы можете получить беплатную квалифицированную консультацию любым удобным для вас способом.</h4>
    <p><i className="fa-solid fa-phone"> 8 800 2000 600</i></p>
    <p><i className="fa-brands fa-instagram"> DogFood</i></p>
    <p><i className="fa-brands fa-vk"> vk.ru/DogFood</i></p>
    <p><i className="fa-solid fa-envelope"><a href='mailto: DogFood@mail.ru'>DogFood@mail.ru</a></i></p>   
  </div>
  )
}

export default About
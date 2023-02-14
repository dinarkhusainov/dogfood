 import React from 'react'
 import helpdog from "../assets/img/priut.jpg"
 
function Help() {
  return (
  <div className="container">
    <div className='promo'>
      <img  src={helpdog} alt="lapa pomoshi" />
    </div>
    <h2> Приют "Лапа Помощи" </h2>
    <h4> Сделайте вкусный подарок нашим маленьким братьям. </h4>
    <h4> Мы поможем с доставкой до приюта. </h4>
     <h4> А еще лучше - обретите нового друга.</h4> 
     <h4> Ульяновск, Студенческая улица, 15 </h4>
    <p><i className="fa-solid fa-phone"> 8 927 985 39 19</i></p>
    <p><i className="fa-brands fa-instagram"> lapapomoschi</i></p>
    <p><i className="fa-brands fa-vk"> https://vk.com/lapa_pomoshi </i></p>
    <p><i className="fa-solid fa-envelope"><a href='mailto: DogFood@mail.ru'>lapa_pomoshi@mail.ru</a></i></p>   
  </div>
  )
}

export default Help;
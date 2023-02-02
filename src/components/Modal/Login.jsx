import React, { useState, useContext } from 'react'
import Ctx from '../../Ctx';

function Login ({changeAuth, close }) {
  const {api, setToken, setUser} = useContext(Ctx);
   
  const [inp1, setInp1] = useState("");
  const [inp2, setInp2] = useState("");

    const sendForm = (e) => {
      e.preventDefault();
      const body = {
        email: inp1,
        password: inp2
      }
      api.signIn(body)
        .then (res => res.json())
        .then ( data => {
          localStorage.setItem("sm8", JSON.stringify(data.data));
          localStorage.setItem("tokensm8", data.token);
          setToken(data.token);
          setUser(data.data);
          if (!data.err) {
            setInp1("");
            setInp2("");
            close(false);
          } else {
            alert(data.message + ". Ошибка: " + data.err.statusCode);
          }
        })
    }

    return (
      <form onSubmit={sendForm}>
        <input className='modal__input' 
          type="email" 
          placeholder='Электронная почта'
          required
          value={inp1}
          onChange = {(e) => {setInp1(e.target.value)}}  
        />
        <input className='modal__input'
          type="password" 
          placeholder='Пароль' 
          value={inp2}
          onChange = {(e) => {setInp2(e.target.value)}}
        />
        <button className='btn' type='submit'>
          Войти
        </button>
        <button className='btn link' type="button" onClick={() => {changeAuth(prev =>!prev)}}>
          Регистрация 
        </button>
      </form>
    )
}
    
export default Login
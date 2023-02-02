import React, { useState, useContext } from 'react'
import Ctx from '../../Ctx';

function SignUp ({changeAuth, close }) {
  const {api, setToken } = useContext(Ctx);
   
  const [inp1, setInp1] = useState("");
  const [inp2, setInp2] = useState("");
  const [inp3, setInp3] = useState("");
  const [testPswrd, setTestPswrd] = useState (true);

  const checkPswrd = (val, type="main") => {
    type==="main" ? setInp2(val) : setInp3(val);

    if (val) {
      if (type === "main") {
        setTestPswrd(val !== inp3);
        setInp2(val);
      } else {
        setTestPswrd(val !== inp2);
        setInp3(val);
      }
    }
  }

    const sendForm = (e) => {
      e.preventDefault();
      const body = {
        email: inp1,
        password: inp2
      }
      console.log (body);
      api.signUp(body)
        .then(res => res.json())
        .then(data => {
          if (!data.err) {
            api.signIn(body)
              .then(res => res.json())
              .then (data => {
                localStorage.setItem("sm8", JSON.stringify(data.data));
                localStorage.setItem("tokensm8", data.token);
                setToken(data.token);
              })
            setInp1("");
            setInp2("");
            setInp3("");
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
          onChange = {(e) => {checkPswrd(e.target.value)}}
        />
        <input className='modal__input'
          type="password" 
          placeholder='Повторите пароль' 
          value={inp3}
          onChange = {(e) => {checkPswrd(e.target.value, "secondary")}}  
        />
        <button className='btn' type='submit' disabled = {testPswrd}>
          Зарегистрироваться
        </button>
        <button className='btn link' type='button' onClick={() => {changeAuth(prev =>!prev)}}>
          Войти
        </button>
      </form>
    )
}
    

export default SignUp
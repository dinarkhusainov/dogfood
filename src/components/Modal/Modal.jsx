import React, {useState} from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import "./style.css";

function Modal ({isActive, setState, api, setToken}) {
    const [auth, setAuth] = useState (true);
    let style = {
        display: isActive ? 'flex' : 'none'
    }
    return (
    <div className="modal-container" style={style}>
        <div className="modal">
            <i className="modal-close fa-solid fa-xmark" onClick={() => setState(false)}></i>
            <h2>{auth ? "Войти" : "Регистрация"}</h2>
            {auth ? 
                <Login changeAuth={setAuth} api={api} close={setState} setToken = {setToken}/> : 
                <SignUp changeAuth={setAuth} api={api} close={setState} setToken = {setToken}/> 
            }
        </div>
    </div>
    )
}

export default Modal
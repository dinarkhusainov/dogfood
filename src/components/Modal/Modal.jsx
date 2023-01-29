import React, {useState} from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import "./style.css";

function Modal ({ isActive, setState }) {
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
                <Login changeAuth={setAuth} close={setState} /> : 
                <SignUp changeAuth={setAuth} close={setState} /> 
            }
        </div>
    </div>
    )
}

export default Modal
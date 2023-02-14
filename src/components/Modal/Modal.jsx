import React, {useState, useContext} from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import Ctx from "../../Ctx";
import "./style.css";

function Modal () {
    const [auth, setAuth] = useState (true);
    const {modalActive, setModalActive} = useContext(Ctx);
    let style = {
        display: modalActive ? 'flex' : 'none'
    }
    return (
    <div className="modal1--container" style={style}>
        <div className="modal1">
            <i className="modal1-close fa-solid fa-xmark" onClick={() => setModalActive(false)}></i>
            <h2>{auth ? "Войти" : "Регистрация"}</h2>
            {auth ? 
                <Login changeAuth={setAuth} close={setModalActive} /> : 
                <SignUp changeAuth={setAuth} close={setModalActive} /> 
            }
        </div>
    </div>
    )
}

export default Modal
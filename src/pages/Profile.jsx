import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import Ctx from '../Ctx';

function Profile () {
    const {user, setUser} = useContext(Ctx);

    const navigate = useNavigate();

    const logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("sm8");
        setUser("");
        navigate("/");
    }
    
    return (
        <div>
            <h2> Личный кабинет, {user} </h2>
            <a href="/" onClick={logOut} style={{color: "orange"}}> Выйти из аккаунта </a>
        </div>
    )
}

export default Profile
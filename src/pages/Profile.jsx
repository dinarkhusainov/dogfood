import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components';
import Ctx from '../Ctx';

function Profile () {
    const {user, setUser, PATH } = useContext(Ctx);

    const navigate = useNavigate();

    const logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("sm8");
        setUser("");
        navigate(PATH);
    }
    console.log(user)
    
    return (
        <div className="container">
            <h2> Личный кабинет, {user && user.name} </h2>
            <img width={400}
                src={user.avatar}
                alt="avatar"
            />
            <p>Профессия: {user.about}</p>
            <p>Почта: {user.email}</p>
            <p>Группа: {user.group}</p>
            <p>id пользователя: {user._id}</p>
            { user && <Button onClick={logOut}> Выйти </Button>}
        </div>
    )
}

export default Profile
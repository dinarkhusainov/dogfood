import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonMy } from '../components';
import { PencilSquare, XSquare, Check5Square } from 'react-bootstrap-icons';
import Ctx from '../Ctx';

function Profile () {
    const {user, setUser, PATH } = useContext(Ctx);
    const [nameFlag, setNameFlag] = useState();
    const [name, setName]=useState();
    const [text, setText]=useState();
    const [textFlag, setTextFlag] = useState();
     
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
            {/* <h1>Личный кабинет</h1>
            <p>
                {nameFlag
                ? <>
                    <span>{name}</span>
                    <PencilSquare />
                    </>
                    : <> 
                    <input> type="text" value ={name} required onChange = {e => setName(e.target.value)}</input>
                    <Check5Square />
                    <XSquare />
                                   
                </>
                }
            </p>
            <p> {!textFlag
            ? <>
                <span>{text}</span>
                <PencilSquare />
            </>
        }



            </p>


 */}



            <h2> Личный кабинет, {user && user.name} </h2>
            <img width={400}
                src={user.avatar}
                alt="avatar"
            />
            <p>Профессия: {user.about}</p>
            <p>Почта: {user.email}</p>
            <p>Группа: {user.group}</p>
            <p>id пользователя: {user._id}</p>
            { user && <ButtonMy onClick={logOut}> Выйти </ButtonMy>}
        </div>
    )
}

export default Profile
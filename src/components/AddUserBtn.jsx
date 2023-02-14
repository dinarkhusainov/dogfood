import { useNavigate } from "react-router"
import { useUsersContext } from "../contexts/userContext/UsersContextProvider"

export function AddUserBtn () {
    
    const navigate = useNavigate()

    const {addNewUser} = useUsersContext()

    const clickHandler = () => {
        const newUser = {
            "name": "",
            "about": "",
            "avatar": "",
            "_id": "",
            "email": "",
            "group": "",
            "__v": 0 ,
        }
        addNewUser(newUser)

        navigate(`/users/${newUser.id}`)
    }

    return (
        <div className="">
            <button onClick={clickHandler} type="button" className="">Add</button>
        </div>
    )
}

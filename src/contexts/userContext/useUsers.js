import { useState } from "react";

export function useUsers () {
    const [users,setUsers] = useState([])

    const addNewUser = (newUser) => {

        

        setUsers (prev => [newUser,...prev])
    }

console.log ({users})

    return {
        users, 
        addNewUser,
    }

}
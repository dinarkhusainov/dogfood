import { createContext, useContext } from "react";
import { useUsers } from "./useUsers";

const UserContext = createContext()


export function UsersContextProvider({children}) {
    const usersData = useUsers ()

    return (
        <UserContext.Provider value={usersData}>
            {children}
        </UserContext.Provider>

    )
}

export const useUsersContext = () => useContext(UserContext)
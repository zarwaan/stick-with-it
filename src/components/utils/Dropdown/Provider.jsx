import { createContext, useContext, useState } from "react";

const Context = createContext();

export default function Provider({children}) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Context.Provider value={{
            isOpen, setIsOpen
        }}>
            {children}
        </Context.Provider>
    )
}

export function useDropdownContext(){
    return useContext(Context)
}
import { createContext, useContext, useState } from "react";

const ViewContext = createContext();

export default function ViewProvider({children}) {
    const [view, setView] = useState("habits");
    const [pos, setPos] = useState(0);
    return (
        <ViewContext.Provider value={{
            view, setView, pos, setPos
        }}>
            {children}
        </ViewContext.Provider>
    )
}

export function useViewContext(){
    return useContext(ViewContext);
}
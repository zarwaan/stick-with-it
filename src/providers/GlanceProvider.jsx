import HabitProvider from "./HabitProvider";

export default function GlanceProvider({children}){
    return (
        <HabitProvider>
            {children}
        </HabitProvider>
    )
}
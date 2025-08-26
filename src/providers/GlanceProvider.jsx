import HabitProvider from "./HabitProvider";
import StatsProvider from "./StatsProvider";

export default function GlanceProvider({children}){
    return (
        <HabitProvider>
            <StatsProvider>
                {children}
            </StatsProvider>
        </HabitProvider>
    )
}
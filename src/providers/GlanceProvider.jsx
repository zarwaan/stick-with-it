import CalendarProvider from "./CalendarProvider";
import HabitProvider from "./HabitProvider";
import StatsProvider from "./StatsProvider";

export default function GlanceProvider({children}){
    return (
        <HabitProvider>
            <StatsProvider>
                <CalendarProvider>
                    {children}
                </CalendarProvider>
            </StatsProvider>
        </HabitProvider>
    )
}
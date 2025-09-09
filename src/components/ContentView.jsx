import ContentBox from "./ContentBox";
import GlanceView from './GlanceView/GlanceView'
import GraphView from './GraphView/GraphView'
import HabitsView from './HabitsView/HabitsView'
import CalendarView from './CalendarView/CalendarView'
import { useViewContext } from "../providers/ViewProvider";
import HabitProvider from "../providers/HabitProvider";
import GlanceProvider from "../providers/GlanceProvider";
import StatsProvider from "../providers/StatsProvider";
import { useAuthContext } from "../providers/AuthProvider";
import InfoMessage from "./utils/InfoMessage";
import { UserLock } from "lucide-react";
import { Link } from "react-router-dom";
import CalendarProvider from "../providers/CalendarProvider";

export default function ContentView(){
    const {view} = useViewContext();
    const {loggedIn} = useAuthContext();
    function AuthMessage() {
        return(
            <span className="">
                <Link to={'/login'} className="underline">Login</Link> or&nbsp;
                <Link to={'/register'} className="underline">Register</Link> to view your habits!
            </span>
        )
    }
    return (
        <>
            {
                !loggedIn && 
                <ContentBox>
                    <div className="text-2xl pt-10">
                        <InfoMessage IconToShow={UserLock} 
                        message={<AuthMessage/>} 
                        iconSize={50} strokeWidth={1}></InfoMessage>
                    </div>
                </ContentBox>
            }
            {
                loggedIn && 
                <ContentBox>
                    {view==="habits" && <HabitProvider><HabitsView></HabitsView></HabitProvider>}
                    {view==="calendar" && <CalendarProvider><CalendarView></CalendarView></CalendarProvider>}
                    {view==="graph" && <StatsProvider><GraphView></GraphView></StatsProvider>}
                    {view==="glance" && <GlanceProvider><GlanceView></GlanceView></GlanceProvider>}
                </ContentBox>
            }
        </>
        // <ContentBox>
        //     {!loggedIn && }
        
        // </ContentBox>
    )
}
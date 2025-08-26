import ContentBox from "./ContentBox";
import GlanceView from './GlanceView/GlanceView'
import GraphView from './GraphView/GraphView'
import HabitsView from './HabitsView/HabitsView'
import CalendarView from './CalendarView/CalendarView'
import { useViewContext } from "../providers/ViewProvider";
import HabitProvider from "../providers/HabitProvider";
import GlanceProvider from "../providers/GlanceProvider";
import StatsProvider from "../providers/StatsProvider";

export default function ContentView(){
    const {view} = useViewContext();
    return (
        <ContentBox>
            {view==="habits" && <HabitProvider><HabitsView></HabitsView></HabitProvider>}
			{view==="calendar" && <CalendarView></CalendarView>}
			{view==="graph" && <StatsProvider><GraphView></GraphView></StatsProvider>}
			{view==="glance" && <GlanceProvider><GlanceView></GlanceView></GlanceProvider>}
        </ContentBox>
    )
}
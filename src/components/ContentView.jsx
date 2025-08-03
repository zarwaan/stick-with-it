import ContentBox from "./ContentBox";
import GlanceView from './GlanceView/GlanceView'
import GraphView from './GraphView/GraphView'
import HabitsView from './HabitsView/HabitsView'
import CalendarView from './CalendarView/CalendarView'
import { useViewContext } from "../providers/ViewProvider";

export default function ContentView(){
    const {view} = useViewContext();
    return (
        <ContentBox>
            {view==="habits" && <HabitsView></HabitsView>}
			{view==="calendar" && <CalendarView></CalendarView>}
			{view==="graph" && <GraphView></GraphView>}
			{view==="glance" && <GlanceView></GlanceView>}
        </ContentBox>
    )
}
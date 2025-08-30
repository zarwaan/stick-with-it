import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function SWIStackedBarChart({dataArg, xVal="x", y1Val="y1", y2Val="y2", xTick={}, tooltip=true, yLabel=""}) {
    // const data = [
    //     {name: "ABC"},
    //     {name: "PQR"},
    //     {name: "XYZ"},
    // ]
    // for(let i=0;i<3;i++){
    //     data[i] = {
    //         ...data[i],
    //         val1: Math.random() * 20,
    //         val2: Math.random() * 20,
    //     }
    // }
    const [data, setData] = useState(dataArg);
    useEffect(() => {
        setData(dataArg)
    },[dataArg]);

    return(
        <ResponsiveContainer width={"100%"} minHeight={"100%"}>
            <BarChart data={data} margin={{
                left: -6,
                top: 5,
                right: 5
            }}>
                <CartesianGrid strokeDasharray={"1 1"}/>
                <XAxis dataKey={xVal} interval={0} tick={xTick}/>
                <YAxis label={{value: yLabel, angle: -90, dx: -10}}/>
                {tooltip && <Tooltip contentStyle={{borderRadius: "15px",backgroundColor: "#ffffffee"}}/>}
                <Legend />
                <Bar dataKey={y1Val} stackId={"id"} fill="#084600ff" animationDuration={700}/>
                <Bar dataKey={y2Val} stackId={"id"} fill="#009650ff" animationDuration={700}/>
            </BarChart>
        </ResponsiveContainer>
    )
}
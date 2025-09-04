import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function SWIAreaChart({dataArg, xVal="x", yVals=["y1"], tooltip=true, yLabel="", xTick}) {
    const [data,setData] = useState(dataArg);
    useEffect(() => setData(dataArg),[dataArg]);

    const n = yVals.length;
    
    const Gradient = ({id, color}) => (
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset={"5%"} stopColor={color} stopOpacity={0.4}/>
            <stop offset={"50%"} stopColor={color} stopOpacity={0.3}/>
            <stop offset={"95%"} stopColor={color} stopOpacity={0.2}/>
        </linearGradient>
    )

    const colorConfig = [
        {
            id: "line2",
            color: "#008235"
        },
        {
            id: "line1",
            color: "#026630"
        },
        {
            id: "line3",
            color: "#00a63e"
        },
        {
            id: "line4",
            color: "#00c950"
        },
        {
            id: "line5",
            color: "#06df72"
        },
    ]
    
    return(
        <ResponsiveContainer>
            <AreaChart data={data} width={"100%"} minHeight={"100%"} margin={{
                left: -4,
                top: 5,
                right: 5
            }}>
                <defs>
                    {
                        Array.from({length: n}).map((_,index) => (
                            <Gradient id={colorConfig[index].id} color={colorConfig[index].color} key={index}/>
                        ))
                    }
                </defs>
                <XAxis dataKey={xVal} tick={xTick}></XAxis>
                <YAxis label={{value: yLabel, angle: -90, dx: -15}}/>
                <CartesianGrid strokeDasharray="3 3" />
                {tooltip && <Tooltip contentStyle={{borderRadius: "15px",backgroundColor: "#ffffffee"}}/>}
                <Legend />
                {
                    Array.from({length: n}).map((_,index) => (
                        <Area type={"monotone"} dataKey={yVals[index]} stroke={colorConfig[index].color} 
                                fillOpacity={1} fill={`url(#${colorConfig[index].id})`} key={index}
                                animationDuration={700} strokeWidth={3}/>
                    ))
                }
            </AreaChart>
        </ResponsiveContainer>
    )
}
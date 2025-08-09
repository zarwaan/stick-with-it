import { Outlet } from "react-router-dom";
import TitleBar from "./TitleBar/TitleBar";

export default function Layout() {
    return (
        <>
            <TitleBar></TitleBar>

            <Outlet></Outlet>
        </>
    )
}
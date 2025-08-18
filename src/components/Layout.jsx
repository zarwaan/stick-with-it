import { Outlet, useNavigation } from "react-router-dom";
import TitleBar from "./TitleBar/TitleBar";
import Loader from "./utils/Loader";

export default function Layout() {
    const navigation = useNavigation();
    return (
        <>
            {
                navigation.state==='loading' && <Loader></Loader>
            }
            <TitleBar></TitleBar>
            <Outlet></Outlet>
        </>
    )
}
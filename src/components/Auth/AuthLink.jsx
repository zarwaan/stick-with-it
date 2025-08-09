import { Link } from "react-router-dom";

export default function AuthLink({pre,linkName,linkTo}) {
    return(
        <div className=" flex flex-row justify-center gap-2 text-lg">
            <div className=" font-semibold text-white">{pre}</div>
            <Link to={linkTo}>
                <div className=" underline font-bold text-green-100">{linkName}</div>
            </Link>
        </div>
    )
}
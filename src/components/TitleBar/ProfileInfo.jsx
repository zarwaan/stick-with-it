import { useAuthContext } from "../../providers/AuthProvider"

export default function ProfileInfo(){
    const {userData, logout} = useAuthContext();
    return (
        <div className="w-[150%] aspect-3/2 border absolute right-0 rounded-xl flex flex-col text-lg 
                        gap-1 bg-[rgba(240,255,248,1)]">
            <div className="">{userData.name}</div>
            <div className="">{userData.email}</div>
            <button className="flex flex-row bg-green-800 text-white p-1 pl-3 pr-3 cursor-pointer
                           rounded-full hover:bg-green-900 gap-1 w-fit m-auto"
                    onClick={logout}>
                            <i className="bi bi-box-arrow-left"></i>
                           <span>Logout</span>
            </button>
        </div>
    )
}
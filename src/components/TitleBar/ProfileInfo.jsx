import { useAuthContext } from "../../providers/AuthProvider"

export default function ProfileInfo({username, firstName, lastName}){
    const {logout} = useAuthContext();

    const logoutRequest = async () => {
        const url = `${import.meta.env.VITE_API_URL_ROOT}/logout`
        try{
            const response = await fetch(url,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })
            const result = await response.json();
            if(response.ok){
                logout();
                console.log(result.message);
            }
            else{
                console.error(result.message)
            }
        }
        catch{
            console.error('Could not send request')
        }
    }
    return (
        <div className="w-fit border absolute right-0 p-2 rounded-xl flex flex-col text-lg items-center
                        gap-1 bg-[rgba(240,255,248,1)]">
            <div className="flex flex-row gap-2">
                <span>Name: </span>
                <span>{firstName}</span>
                <span>{lastName}</span>
            </div>
            <div className="flex flex-row gap-2">
                <span>Username:</span> 
                <span>{username}</span>
            </div>
            <div>
                <button className="flex flex-row bg-green-800 text-white p-1 pl-3 pr-3 cursor-pointer
                            rounded-full hover:bg-green-900 gap-1 w-fit m-auto"
                            onClick={logoutRequest}>
                                <i className="bi bi-box-arrow-left"></i>
                            <span>Logout</span>
                </button>
            </div>
        </div>
    )
}
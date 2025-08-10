import { House, LayoutDashboard } from 'lucide-react'
import image from '../assets/404.png'
import { useNavigate } from 'react-router-dom'
export default function Error404() {
    const navigate = useNavigate();
    return(
        <div className="flex flex-col justify-center gap-5">
            <div className='w-1/2 m-auto'>
                <img src={image} className="rounded-2xl" alt=""></img>
            </div>
            <div className="w-fit m-auto text-3xl font-bold bg-emerald-300 text-green-900 p-2 pl-5 pr-5 rounded-full">
                Error 404 - We can't find the page you're looking for :(
            </div>
            <div className="">
                <button className='bg-green-800 text-white p-2 pl-4 pr-4 rounded-xl 
                        flex flex-row m-auto flex-center gap-2 cursor-pointer'
                        onClick={()=>{navigate('/')}}>
                    <div className='font-semibold flex'>
                        Back to home
                    </div>
                    <div className=' h-fit'>
                        <House size={20}></House>
                    </div>
                </button>
            </div>
        </div>
    )
}
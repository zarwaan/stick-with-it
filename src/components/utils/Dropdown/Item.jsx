export default function Item({children, onclick=()=>{}}) {
    return (
        <div className="hover:bg-green-700/90 hover:text-green-100 p-2 rounded-xl 
                        w-full m-auto cursor-pointer"
                onClick={onclick}>
            {children}
        </div>
    )
}
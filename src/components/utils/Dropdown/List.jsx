export default function List({children}) {
    return (
        <div className="border rounded-xl absolute left-0 top-[110%] bg-green-100 w-full p-0 
                        max-h-85 overflow-y-scroll custom-scroll">
            {children}
        </div>
    )
}
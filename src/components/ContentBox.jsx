export default function ContentBox({children}) {
    return (
        <div className="w-[80%] bord m-auto p-2 aspect-[3/2] flex justify-center items-center bg-red-50 rounded-2xl">
            {children}
        </div>
    )
}
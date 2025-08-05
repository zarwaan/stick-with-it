export default function ContentBox({children}) {
    return (
        <div className="w-[80%] bord m-auto p-2 aspect-[5/3] max-h-full bg-emerald-50 rounded-2xl">
            {children}
        </div>
    )
}
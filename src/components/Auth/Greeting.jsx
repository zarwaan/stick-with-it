export default function Greeting({title, subtitle}) {
    return (
        <div className=" flex flex-col gap-0">
            <div className=" text-3xl text-white font-bold" id="title">
                {title}
            </div>
            <div className=" text-md italic text-white font-semibold" id="subtitle">
                {subtitle}
            </div>
        </div>
    )
}
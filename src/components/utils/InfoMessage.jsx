export default function InfoMessage({IconToShow, message, iconSize, strokeWidth}) {
    return (
        <div className="flex flex-col gap-2 flex-center">
            <div className="">
                {message}
            </div>
            <div className="">
                <IconToShow size={iconSize} strokeWidth={strokeWidth}/>
            </div>
        </div>
    )
}
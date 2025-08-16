export default function Loader({widthInPercent=6}) {
    const width = `w-${widthInPercent}/100`

    return(
        <div className={`border- ml-auto mr-auto aspect-square`}
                style={{width: widthInPercent+"%"}}>
            <div className="border-3 aspect-square rounded-full relative">

                {/* minute hand */}
                <div className="border- absolute w-full top-[50%] -translate-y-[50%] rounded-full animate-spin">
                    <div className="border- border-violet-700 w-1/2 rounded-full flex justify-end">
                        <div className="border-2 border-black rounded-full w-80/100"></div>
                    </div>
                </div>

                {/* hour hand */}
                <div className="border- absolute w-full top-[50%] -translate-y-[50%] rounded-full animate-spin" 
                        style={{animationDuration: "3s"}}>
                    <div className="border- border-violet-700 w-1/2 rounded-full flex justify-end">
                        <div className="border-2 border-black rounded-full w-50/100"></div>
                    </div>
                </div>

            </div>
        </div>
    )
}
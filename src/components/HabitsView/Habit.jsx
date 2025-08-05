export default function Habit({habit}) {
    return (
        <div className="border border-2 border-green-900 rounded-full flex flex-row p-2 gap-3
                        bg-green-100">
            <div className="border- border-green-700 border-5 w-[10%] rounded-full aspect-square flex-center text-3xl">
                <span className="tex-shadow-[-3px_3px_5px_rgb(0_0_0_/_0.5)]">
                    {habit.emoji}
                </span>
            </div>
            <div className="border- border-blue-700 flex-1 flex items-center">
                <span className="w-fit border- h-fit text-3xl font-semibold">
                    {habit.title}
                </span>
            </div>
        </div>
    )
}
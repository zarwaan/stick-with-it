export default function StatBox({auto = true, statName, statValue, children}) {
    return (
        <div className="border-3 border-green-900 bg-green-100 rounded-2xl w-full p-2">
            {!auto && children}
            { auto &&
                <div className="flex flex-col h-full gap-1 p-1">
                    <div className="text-xl font-semibold">
                        {statName}
                    </div>
                    <div className="text-4xl">
                        {statValue}
                    </div>
                </div>
            }
        </div>
    )
}
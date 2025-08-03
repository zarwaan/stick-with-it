export default function GlanceView(){
    return(
        <div className="grid grid-cols-3 grid-rows-2 aspect-3/2 gap-3
        *:border *:bg-red-100 *:rounded-2xl *:flex *:justify-center *:items-center *:text-xl *:p-3">
            <div className="col-span-2 row-span-2"><span>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</span></div>
            <div className=""><span>Calendar</span></div>
            <div className=""><span>Graph</span></div>
        </div>
    )
}
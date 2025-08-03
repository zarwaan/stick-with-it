export default function NavButtonHighlight() {

    return (
        <div className="absolute w-full h-full bg--700 top-0 transition-all duration-300 flex justify-center items-center" 
        style={{left: "var(--left)"}}>
            <div className="w-[90%] h-[80%] bg-blue-600 rounded-full"></div>
        </div>
    )
}
export default function InputBox({cred, type}) {
    return (
        <div className="">
            <input type={type} 
            className="border w-8/10 rounded-lg bg-white p-1 pl-2 pr-2"
            placeholder={cred}
            />
        </div>
    )
}
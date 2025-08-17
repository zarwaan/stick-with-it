export default function InputField({field,setData,label,value}) {
    const handleChange = (e) => {
        setData(prev => (
            {
                ...prev,
                [field]: e.target.value
            }
        ))
    }
    return (
        <>
            <div className=" w-fit font-semibold">
                {label}*
            </div>
            <input type="text" onChange={handleChange} value={value}
            className="border bg-white rounded-lg p-1 pl-2 pr-2 w-full" />
        </>
    )
}
export default function AuthLayout({children}) {
    return (
        <div className="border w-35/100 p-7 m-auto bg-teal-600 rounded-xl flex flex-col gap-4">
            {children}
        </div>
    )
}
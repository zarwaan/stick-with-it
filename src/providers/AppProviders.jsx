import AuthProvider from "./AuthProvider";
import HabitListProvider from "./HabitListProvider";
import ViewProvider from "./ViewProvider";

export default function AppProviders({children}){
    return (
        <AuthProvider>
            <HabitListProvider>
                <ViewProvider>
                    {children}
                </ViewProvider>
            </HabitListProvider>
        </AuthProvider>
    )
}
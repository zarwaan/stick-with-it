import AuthProvider from "./AuthProvider";
import ViewProvider from "./ViewProvider";

export default function AppProviders({children}){
    return (
        <AuthProvider>
            <ViewProvider>
                {children}
            </ViewProvider>
        </AuthProvider>
    )
}
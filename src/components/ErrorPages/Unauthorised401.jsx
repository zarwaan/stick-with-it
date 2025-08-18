import image from '../../assets/401.png'
import ErrorLayout from './ErrorLayout'
export default function Unauthorised401() {
    return(
        <ErrorLayout
            image={image}
            errorText={"Error 401 - You need to login to access this page"}
            navigateTo={'/login'}
            buttonText={"Login"}
            imageStyle={{
                border: "2px solid black"
            }}
        />
    )
}
import image from '../../assets/404.png'
import ErrorLayout from './ErrorLayout';
export default function Error404() {
    return(
        <ErrorLayout
            image={image}
            errorText={"Error 404 - We can't find the page you're looking for :("}
            navigateTo={'/'}
            buttonText={"Back to home"}
        />
    )
}
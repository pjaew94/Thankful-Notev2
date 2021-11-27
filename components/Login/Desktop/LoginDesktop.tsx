import LoginDeskTopDisplay from "./LoginDeskTopDisplay"
import LoginFormDesktop from "./LoginFormDesktop"



const LoginDesktop:React.FC = ({}) => {
    return (
        <div className='flex relative w-screen h-screen overflow-x-hidden px-16 py-16'>
         
            <LoginDeskTopDisplay />
            <LoginFormDesktop />
    
        </div>
    )
}

export default LoginDesktop

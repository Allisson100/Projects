import { LogoContainer } from "./styles";
import { FaCameraRetro } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'

const PropsLogo ={
    color: 'white',
    size: '80%'
}

export default function Logo() {

    const navigate = useNavigate()

    function handlePageNavigation() {
        navigate('/')
    }

    return (
        <LogoContainer>
            <FaCameraRetro {...PropsLogo} onClick={handlePageNavigation}/>
        </LogoContainer>
    )
}
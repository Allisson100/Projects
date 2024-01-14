import { useSelector } from "react-redux";
import { ToastContainer, ToastText } from "./styles";
import { useEffect, useState } from "react";

export default function Toast() {

    const toastMessage = useSelector(state => state.toastMessage)

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {

        let timeoutId

        if(toastMessage !== '') {
            setIsVisible(true);

            timeoutId = setTimeout(() => {
                setIsVisible(false);
            }, 5000);

        }

        return () => clearTimeout(timeoutId);

    }, [toastMessage]);


    return (
        <ToastContainer $isVisible={isVisible}>
            {toastMessage.map((toast, index) => (
                <ToastText key={index} $status={toast.status} $isVisible={isVisible}>
                    {toast.message}
                </ToastText>
            ))}
        </ToastContainer>
            
    )
}
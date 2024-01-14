import { Outlet } from "react-router-dom";
import Header from "../Header";
import { MainContainer } from "./styles";
import Toast from "../Toast";

export default function DefaultPage() {


    return (
        <MainContainer>
            <Toast />
            <Header />
            <Outlet />
        </MainContainer>
    )
}
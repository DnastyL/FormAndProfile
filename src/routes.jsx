import { Route, Routes } from "react-router-dom"
import { Formulario } from "./components/Formulario/Formulario"
import { UserContextProvider } from "./context/UserContext"
import { Perfil } from "./pages/Perfil"


export const AppRoutes = () =>{
    return(
        <UserContextProvider> 
            <Routes>
                <Route path="/" element={<Formulario/>}/>
                <Route path="/perfil/:username" element={<Perfil/>}/>
            </Routes>
        </UserContextProvider>
    )
}
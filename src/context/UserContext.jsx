import { createContext, useState } from "react";

export const UsuarioContext = createContext({})

export const UserContextProvider = ({children}) =>{
    const[usuario, setUsuario] = useState({
        nome: '',
        email: '',
        cpf:'',
        sexo: '',
        telefone: ''
    });
    return(
        <UsuarioContext.Provider value={{usuario, setUsuario}}>
            {children}
        </UsuarioContext.Provider>
    )
}
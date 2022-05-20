import { createContext, useState } from "react";

export const UsuarioContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() =>{
      const dados = localStorage.getItem('usuario')
      if(dados){
        return JSON.parse(dados)
      }
      return undefined
  });

  const login = (value) => {
    localStorage.setItem("usuario", JSON.stringify(value));
    setUsuario(value)
  };

  const logout = () => {
    localStorage.removeItem("image");
    localStorage.removeItem("usuario");

    setUsuario(undefined);
  };

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario, login, logout }}>
      {children}
    </UsuarioContext.Provider>
  );
};

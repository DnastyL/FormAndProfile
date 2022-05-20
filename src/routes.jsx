import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Formulario } from "./components/Formulario/Formulario";
import { UsuarioContext } from "./context/UserContext";
import { Perfil } from "./pages/Perfil";

export const AppRoutes = () => {
  const { usuario } = useContext(UsuarioContext);
  return (
    <Routes>
      {!usuario ? (
        <>
          <Route path="/" element={<Formulario />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/perfil/:username" element={<Perfil />} />
          <Route path="*" element={<Navigate to={"/perfil/:username"}/>}/>
        </>
      )}
    </Routes>
  );
};

import { useContext, useState } from "react";
import { UsuarioContext } from "../context/UserContext";
import "./perfil.css";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { ImUser } from "react-icons/im";
import { useNavigate } from "react-router-dom";

export const Perfil = () => {
  let navigate = useNavigate();
  const { usuario, logout } = useContext(UsuarioContext); //Dados do context

  const [img, setImg] = useState(() => {
    //renderização condicional
    const image = localStorage.getItem("image");

    return image ? <img alt="profile" src={image} /> : <ImUser />;
  });

  function inputFile() {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = (event) => {
      console.log(event);

      const url = URL.createObjectURL(event.target.files[0]);
      localStorage.image = url;

      setImg(<img alt="profile-pricture" src={localStorage.image} />);
    };
    input.click();
  }

  return (
    <div className="main-box">
      <div className="perfil-box">
        <div className="titles">
          <h4>Bem vindo, {usuario.nome}</h4>
        </div>
        <div className="menu-box">
          <div className="ui-menu">
            <div className="profile">
              <div className="icon-box">
                <span className="user-icon">{img}</span>
                
                <span className="gallery-icon" onClick={inputFile}>
                  <MdOutlineAddPhotoAlternate />
                </span>
              </div>
              <div className="dados-box">
                <div className="description-title">
                  <h4>Nome: {usuario.nome}</h4>
                  <p>Email: {usuario.email}</p>
                </div>
                <div className="ui-dados">
                  <p>Telefone: {usuario.telefone}</p>
                  <p>Sexo: {usuario.sexo}</p>
                </div>
              </div>
              <div className="box-button">
                <button
                  onClick={() => {
                    logout();
                    navigate(`/`);
                  }}
                >
                  Sair do Perfil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

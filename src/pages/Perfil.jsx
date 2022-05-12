import { useContext, useState } from "react";
import { UsuarioContext } from "../context/UserContext";
import "./perfil.css";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { ImUser } from "react-icons/im";
import { useNavigate } from "react-router-dom";

export const Perfil = () => {
  let navigate = useNavigate();
  const { usuario } = useContext(UsuarioContext); //Dados do context
  const [dados] = useState(   //verificação de dados nulos no localstorage 
    localStorage.getItem('usuario') == null || localStorage.usuario === ''
      ? usuario
      : JSON.parse(localStorage.usuario)
  );

  const [render, setRender] = useState(false); //Efeito hover no react

  const [img, setImg] = useState(
    //renderização condicional
    localStorage.getItem('image') != null ?  (
      localStorage.image !== '' ? <img alt="profile" src={localStorage.image} /> : <ImUser></ImUser>
    ) :  (
      <ImUser></ImUser>
    )
  );

  console.log(dados);

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
          <h4>Bem vindo, {dados.nome}</h4>
        </div>
        <div className="menu-box">
          <div className="ui-menu">
            <div className="profile">
              <div
                className="icon-box"
                onMouseEnter={() => setRender(true)}
                onMouseLeave={() => setRender(false)}
              >
                <span className="user-icon">{img}</span>
                {render ? (
                  <span className="gallery-icon" onClick={inputFile}>
                    <MdOutlineAddPhotoAlternate></MdOutlineAddPhotoAlternate>
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="dados-box">
                <div className="description-title">
                  <h4>Nome: {dados.nome}</h4>
                  <p>Email: {dados.email}</p>
                </div>
                <div className="ui-dados">
                  <p>Telefone: {usuario.telefone}</p>
                  <p>Sexo: {dados.sexo}</p>
                </div>
              </div>
              <div className="box-button">
                <button
                  onClick={() => {
                    localStorage.image = "";
                    localStorage.usuario = "";
                    usuario.nome = '';
                    usuario.email = '';
                    usuario.cpf = '';
                    usuario.telefone = '';
                    usuario.sexo = ''
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

import { useContext, useState } from "react";
import { MaskCPF } from "./masks/maskCpf/MaskCpf";
import { MaskTel } from "./masks/maskTel/MaskTel";
import "./formulario.css";
import { useNavigate } from "react-router-dom";
import { UsuarioContext } from "../../context/UserContext";

export const updateLocalStorage = (usuario) => {
  localStorage.setItem('usuario', JSON.stringify(usuario))
}

function verificationNameEmail(value, name, setUsuario, setValidEmail, usuario) {
  if (name === "nome"){
    let valueReplace = value.replace(/\d/g, "");
    setUsuario({
      ...usuario,
      [name]: valueReplace,
    });
  }
  if(name === 'email'){
    let validEmail = value.toLocaleLowerCase().match(/^[\w.-_]+@[\w.-_]+\.[a-z]{3,}/)
      setValidEmail(validEmail);
      setUsuario({
        ...usuario,
        [name]: value,
      })
  }
}

export const Formulario = () => {
  const { usuario, setUsuario } = useContext(UsuarioContext);
  const [ validEmail, setValidEmail] = useState(false);
  const onlyNumbers = (str) => str.replace(/[^0-9]/g, '');
  let navigate = useNavigate();

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    

    if (name === "cpf" || name === "telefone") {
      setUsuario({
        ...usuario,
        [name]: onlyNumbers(value),
      });
    }if(name === "sexo"){
      setUsuario({
        ...usuario,
        [name]: value,
      })
    } 
    else {
      verificationNameEmail(value, name, setUsuario, setValidEmail, usuario);
    }
    
  };


  //usuario.nome.replace(/\d/g, "")

  return (
    <div className="ui-form">
      <div className="catalogo-box">
        <div className="form">
          <h2>Cadastro</h2>
          <div className="input-text">
            <label>Nome:</label>
            <input
              type="text"
              placeholder="Nome"
              autoComplete="off"
              name="nome"
              value={usuario.nome}
              onChange={handleOnChange}
            />
          </div>
          <div className="input-text">
            <label>Email:</label>
            <input
              type="text"
              placeholder="Email"
              autoComplete="off"
              value={usuario.email}
              name="email"
              onChange={handleOnChange}
            />
            {!validEmail && usuario.email !== '' ? <span className="seila">E-mail inválido</span>: ""}
          </div>
          <div className="input-text">
            <label>CPF:</label>
            <MaskCPF name="cpf" value={usuario.cpf} onChange={handleOnChange} />
            {usuario.cpf && (
              <nav className="box-button">
                <button
                  onClick={() =>
                    setUsuario({
                      ...usuario,
                      cpf: "",
                    })
                  }
                >
                  Limpar
                </button>
              </nav>
            )}
          </div>
          <div className="input-text">
            <label>Telefone:</label>
            <MaskTel
              name="telefone"
              value={usuario.telefone}
              onChange={handleOnChange}
            />
          </div>
          <div className="input-text">
            <label>Sexo</label>
            <select name="sexo" value={usuario.sexo} onChange={handleOnChange}>
              <option> </option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
          <div className="box-button">
            <button
              id="botao"
              type="submit"
              disabled={
                !usuario.nome ||
                !validEmail ||
                usuario.cpf.length < 11 ||
                !usuario.sexo ||
                usuario.telefone.length < 13
              }
              onClick={() => {
                if(!validEmail){
                  alert('Email inválido')
                }
                else{
                  navigate(`/perfil/${usuario.nome}`);
                  updateLocalStorage(usuario);
                }
              }}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

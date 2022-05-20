import { useContext, useState } from "react";
import { MaskCPF } from "./masks/maskCpf/MaskCpf";
import { MaskTel } from "./masks/maskTel/MaskTel";
import "./formulario.css";
import { useNavigate } from "react-router-dom";
import { UsuarioContext } from "../../context/UserContext";


function verificationNameEmail(value, name, setUser, setValidEmail, user) {
  if (name === "nome"){
    let valueReplace = value.replace(/\d/g, "");
    setUser({
      ...user,
      [name]: valueReplace,
    });
  }
  if(name === 'email'){
    let validEmail = value.toLocaleLowerCase().match(/^[\w.-_]+@[\w.-_]+\.[a-z]{3,}/)
      setValidEmail(validEmail);
      setUser({
        ...user,
        [name]: value,
      })
      console.log(user)
      console.log(validEmail)
  }
}

export const Formulario = () => {
  const { login } = useContext(UsuarioContext);
  const [user, setUser] = useState({
    nome: "",
    email: "",
    cpf: "",
    sexo: "",
    telefone: "",
  });
  
  const [ validEmail, setValidEmail] = useState(false);
  const onlyNumbers = (str) => str.replace(/[^0-9]/g, '');
  let navigate = useNavigate();

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    if (name === "cpf" || name === "telefone") {
      setUser({
        ...user,
        [name]: onlyNumbers(value),
      });
    }if(name === "sexo"){
      setUser({
        ...user,
        [name]: value,
    })
    } 
    else {
      verificationNameEmail(value, name, setUser, setValidEmail, user);
    }
    
  };


  //user.nome.replace(/\d/g, "")

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
              value={user.nome}
              onChange={handleOnChange}
            />
          </div>
          <div className="input-text">
            <label>Email:</label>
            <input
              type="text"
              placeholder="Email"
              autoComplete="off"
              value={user.email}
              name="email"
              onChange={handleOnChange}
            />
            {!validEmail && user.email !== '' ? <span className="seila">E-mail inválido</span>: ""}
          </div>
          <div className="input-text">
            <label>CPF:</label>
            <MaskCPF name="cpf" value={user.cpf} onChange={handleOnChange} />
            {user.cpf && (
              <nav className="box-button">
                <button
                  onClick={() =>
                    setUser({
                      ...user,
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
              value={user.telefone}
              onChange={handleOnChange}
            />
          </div>
          <div className="input-text">
            <label>Sexo</label>
            <select name="sexo" value={user.sexo} onChange={handleOnChange}>
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
                !user.nome ||
                user.cpf.length < 11 ||
                !user.sexo ||
                user.telefone.length < 13
              }
              onClick={() => {
                if(!validEmail){
                  alert('Email inválido')
                }
                else{
                  navigate(`/perfil/${user.nome}`);
                  login(user);
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

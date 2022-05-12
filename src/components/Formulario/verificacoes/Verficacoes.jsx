export const Verificacoes = ({value, name, usuario, setUsuario}) =>{
        console.log(value)

        function verificaEmailNome(value, name, usuario, setUsuario){
          let valueReplace = value.replace(/\d/g, "")
          setUsuario({
            ...usuario,
            [name]: valueReplace,
          });
        }

        return verificaEmailNome();
}
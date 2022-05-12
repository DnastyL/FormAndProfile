import InputMask from 'react-input-mask'

export const MaskTel = ({ name, value, onChange}) => {


    return(
        <InputMask
           mask="+55 99 99999 9999"
           name={name}
           value={value}
           onChange={onChange}
        />
    )
}
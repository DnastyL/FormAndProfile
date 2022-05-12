import InputMask from "react-input-mask";

//const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");

export const MaskCPF = ({name,  value, onChange }) => {
  /*function handleChange(e) {
    onChange({
      ...e,
      target: {
        ...e.target,
        value: onlyNumbers(e.target.value),
      },
    });
  }*/

  return (
    <InputMask
      mask="999.999.999-99"
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

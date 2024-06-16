import { Dispatch, SetStateAction } from "react";

type FormInputProps = {
  lable: string;
  name: string;
  type: string;
  value: string | number;
  setValue: Dispatch<SetStateAction<string>>;
};
export default function FormInput({
  lable,
  name,
  type,
  value,
  setValue,
}: FormInputProps) {
  function changeHandler (event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }
  return (
    <div className="mt-2">
      <label htmlFor={name}>{lable}</label>
      <br />
      <input
        id={name}
        type={type}
        name={name}
        className="border border-black mt-1 rounded-md w-full p-1"
        value={value}
        onChange={changeHandler}
      />
    </div>
  );
}

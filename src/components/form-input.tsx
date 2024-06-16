type FormInputProps = {
  lable: string;
  name: string;
  type: string
};
export default function FormInput({lable, name, type}: FormInputProps) {
  return (
    <div className="mt-2">
      <label htmlFor={name}>{lable}</label>
      <br />
      <input id={name} type={type} name={name} className="border border-black mt-1 rounded-md w-full "/>
    </div>
  );
}

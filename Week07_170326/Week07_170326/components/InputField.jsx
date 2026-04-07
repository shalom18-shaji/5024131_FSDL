export default function InputField({ name, value, onChange, placeholder }) {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full mb-4 p-3 border rounded-lg"
    />
  );
}
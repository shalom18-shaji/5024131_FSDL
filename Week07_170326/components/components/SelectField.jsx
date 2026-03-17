export default function SelectField({ name, value, onChange, options }) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full mb-4 p-3 border rounded-lg"
    >
      <option value="">Select</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
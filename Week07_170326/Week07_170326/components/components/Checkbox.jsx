export default function Checkbox({ name, checked, onChange, label }) {
  return (
    <label className="flex items-center mb-4">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="mr-2"
      />
      {label}
    </label>
  );
}
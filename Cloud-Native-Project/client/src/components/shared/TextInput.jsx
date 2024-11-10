const TextInput = ({ label, type, placeholder, value, setState }) => {
  const handleChange = (e) => {
    setState(e.target.value);
  };

  return (
    <div className="text-input-container">
      <span className="text-input-label">{label}</span>
      <input
        className="text-input-field"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default TextInput;

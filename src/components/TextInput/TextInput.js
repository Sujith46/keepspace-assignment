const TextInput = ({ label, name, onChange, type = "text", defaultValue, }) => {
  return (
    <div className="form-control w-full ">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        placeholder="Type here"
        className="input input-bordered w-full"
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;

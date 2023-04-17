const RadioBtn = ({ label, checked, name, onChange, defaultValue }) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text mr-2">{label}</span>
        <input
          type="radio"
          name="radio-10"
          className="radio checked:bg-red-500"
          checked={checked}
          name={name}
          defaultValue={defaultValue}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default RadioBtn;

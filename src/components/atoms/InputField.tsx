import { InputFieldProps } from "@/types";

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  name,
  isRequired,
  id = label,
  placeholder,
  labelClass,
  inputClass,
  prefixIcon,
  suffixIcon,
  error = "",
  onBlur,
  onChange,
  ...props
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <div>
      <label htmlFor={id} className={`input-label ${labelClass}`}>
        {label}
      </label>
      <div className={`relative ${inputClass}`}>
        {prefixIcon && <div className="input-prefix">{prefixIcon}</div>}
        <input
          id={id}
          name={name}
          value={value}
          type={type || "text"}
          required={isRequired}
          placeholder={placeholder}
          className={`input-field ${inputClass} ${error && "!border-error"}`}
          onChange={handleOnChange}
          onBlur={onBlur}
          {...props}
        />
        {suffixIcon && <div className="input-suffix">{suffixIcon}</div>}
      </div>
      {error && (
        <div id="input-error" className="text-sm text-error mt-1">
          {error}
        </div>
      )}
    </div>
  );
};

export default InputField;

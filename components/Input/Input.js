import TextField from "@mui/material/TextField";

const InputCustom = ({ errors, name, register, registerProps, ...props }) => {
  return (
    <>
      <TextField
        id="outlined-basic"
        variant="outlined"
        autoComplete="nope"
        name={name}
        {...props}
        {...register(name, registerProps)}
      />

      {errors[name] && (
        <p className="error-message" role="alert">
          {errors[name].message}
        </p>
      )}
    </>
  );
};

export default InputCustom;

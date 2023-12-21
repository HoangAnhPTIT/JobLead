import { FormControl, FormHelperText, TextField } from "@mui/material";

const InputForm = ({
	name,
	label,
	helper,
	helperClass = "",
	required = false,
	register,
}) => {
	return (
		<FormControl fullWidth>
			<TextField
				size="small"
				label={label}
				required={required}
				{...register(name, { required })}
			/>
			<FormHelperText className={helperClass}>{helper}</FormHelperText>
		</FormControl>
	);
};

export default InputForm;

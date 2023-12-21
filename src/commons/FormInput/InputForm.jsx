import { FormControl, FormHelperText, TextField } from "@mui/material";

const InputForm = ({ name, label, helper, required = false, register }) => {
	return (
		<FormControl fullWidth>
			<TextField
				size="small"
				label={label}
				required={required}
				{...register(name, { required })}
			/>
			<FormHelperText>{helper}</FormHelperText>
		</FormControl>
	);
};

export default InputForm;

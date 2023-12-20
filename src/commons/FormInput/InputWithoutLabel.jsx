import { TextField } from "@mui/material";

const InputWithoutLabel = ({ name, placeholder, register, classname }) => {
	return (
		<TextField
			fullWidth
			size="small"
			variant="outlined"
			placeholder={placeholder}
			className={classname}
			defaultValue=""
			{...register(name)}
		/>
	);
};

export default InputWithoutLabel;

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from "@mui/material";
import React from "react";

const InputPassword = ({ required, register }) => {
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<FormControl fullWidth size="small" variant="outlined">
			<InputLabel required={required} htmlFor="outlined-adornment-password">
				Mật khẩu
			</InputLabel>
			<OutlinedInput
				{...register("password", { required })}
				id="outlined-adornment-password"
				type={showPassword ? "text" : "password"}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
				label="Password"
			/>
		</FormControl>
	);
};

export default InputPassword;

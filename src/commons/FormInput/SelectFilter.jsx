import { Autocomplete, FormControl, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const SelectFilter = ({
	label,
	name,
	required,
	placeholder = "",
	list,
	classname = "",
	valueKey = "id",
	control,
}) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue=""
			onChange={([event, data]) => {
				return data;
			}}
			render={({ field }) => {
				const { onChange, value } = field;

				return (
					<FormControl fullWidth>
						<Autocomplete
							fullWidth
							size="small"
							disablePortal
							options={list || []}
							getOptionLabel={(option) => option?.name || ""}
							noOptionsText=""
							value={
								value
									? list?.find((option) => value === option?.[valueKey]) ?? null
									: null
							}
							onChange={(e, newValue) => {
								const resolvedValue = newValue ? newValue?.[valueKey] : null;
								onChange(resolvedValue);
							}}
							renderInput={(params) => (
								<TextField
									className={classname}
									{...params}
									label={label}
									required={required}
									placeholder={placeholder}
									inputProps={{
										...params.inputProps,
										autoComplete: "disabled", // disable autocomplete and autofill
									}}
								/>
							)}
						/>
					</FormControl>
				);
			}}
		/>
	);
};

export default SelectFilter;

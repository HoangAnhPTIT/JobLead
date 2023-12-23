import { Autocomplete, FormControl, TextField } from "@mui/material";

const SelectFilter = ({
	name,
	required,
	placeholder,
	list,
	classname,
	valueKey = "id",
	Controller,
	control,
}) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={{}}
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

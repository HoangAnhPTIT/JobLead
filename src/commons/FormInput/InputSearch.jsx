import { Autocomplete, FormControl, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { httpGet } from "src/apis/apiCaller";
import { apiJob } from "src/apis/apiEndpoint";

const InputSearch = ({
	name,
	placeholder,
	classname,
	setValue,
	Controller,
	control,
}) => {
	const [suggestList, setSuggestList] = useState([]);

	useEffect(() => {
		const getSuggest = async () => {
			const response = await httpGet(`${apiJob}/suggestion?q='`);
			setSuggestList(response?.data);
		};
		getSuggest();
	}, []);

	return (
		<Controller
			control={control}
			name={name}
			defaultValue=""
			render={({ field }) => {
				const { onChange, value, ref } = field;
				return (
					<FormControl fullWidth>
						<Autocomplete
							freeSolo
							size="small"
							ref={ref}
							options={suggestList || []}
							getOptionLabel={(option) => option?.name || ""}
							value={
								value
									? suggestList?.find((option) => value === option?.name) ?? ""
									: ""
							}
							onChange={(e, newValue) => {
								const resolvedValue = newValue ? newValue?.name : "";
								onChange(resolvedValue);
							}}
							renderInput={(params) => (
								<TextField
									className={classname}
									{...params}
									inputProps={{
										...params.inputProps,
										autoComplete: "disabled", // disable autocomplete and autofill
									}}
									onBlur={(e) => setValue("q", e.target.value)}
									placeholder={placeholder}
								/>
							)}
						/>
					</FormControl>
				);
			}}
		/>
	);
};

export default InputSearch;

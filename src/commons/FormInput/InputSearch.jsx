import { Autocomplete, FormControl, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { httpGet } from "src/apis/apiCaller";
import { apiJob } from "src/apis/apiEndpoint";

const InputSearch = ({ name, placeholder, classname, Controller, control }) => {
	const [valueInput, setValueInput] = useState("");
	const [suggestList, setSuggestList] = useState([]);

	useEffect(() => {
		const getSuggest = async () => {
			const response = await httpGet(`${apiJob}/suggestion?q=${valueInput}`);
			setSuggestList(response?.data);
		};
		getSuggest();
	}, [valueInput]);

	return (
		<Controller
			control={control}
			name={name}
			defaultValue={{}}
			render={({ field }) => {
				const { onChange, value } = field;
				return (
					<FormControl fullWidth>
						<Autocomplete
							freeSolo
							size="small"
							{...field}
							options={suggestList || []}
							getOptionLabel={(option) => option?.name || ""}
							value={
								value
									? suggestList?.find((option) => value === option?.name) ??
									  null
									: null
							}
							onChange={(e, newValue) => {
								const resolvedValue = newValue ? newValue?.name : null;
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
									placeholder={placeholder}
									onChange={(e) => setValueInput(e.target.value)}
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

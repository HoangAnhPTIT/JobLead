import { Clear } from "@mui/icons-material";
import {
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

const SelectForm = ({
	label,
	name,
	required,
	placeholder,
	list,
	classname,
	allowClear,
	valueKey = "id",
	control,
	getValues,
}) => {
	const [valueSelected, setValueSelected] = useState(false);

	useEffect(() => {
		if (getValues && getValues(name)) {
			setValueSelected(true);
		}
	}, [getValues, name]);

	return (
		<Controller
			name={name}
			control={control}
			defaultValue=""
			render={({ field }) => (
				<FormControl fullWidth>
					{label && (
						<InputLabel
							size="small"
							required={required}
							id="demo-simple-select-label"
						>
							{label}
						</InputLabel>
					)}
					<Select
						displayEmpty={!label}
						className={classname}
						size="small"
						{...field}
						onChange={(e) => {
							field.onChange(e);
							setValueSelected(e.target.value);
						}}
						input={<OutlinedInput />}
						MenuProps={{
							PaperProps: {
								style: {
									maxHeight: 500,
								},
							},
						}}
						renderValue={(selected) =>
							selected ? (
								<span>
									{list?.find((item) => item?.[valueKey] === selected)?.name}
								</span>
							) : (
								<span className="text-placeholder">{placeholder}</span>
							)
						}
						endAdornment={
							allowClear && (
								<div>
									{valueSelected && (
										<Clear
											fontSize="small"
											className="cursor-pointer -ml-8"
											onClick={() => {
												field.onChange("");
												setValueSelected("");
											}}
										/>
									)}
								</div>
							)
						}
					>
						{list?.map((item, i) => (
							<MenuItem key={i} value={item?.[valueKey]}>
								{item?.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			)}
		/>
	);
};

export default SelectForm;

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const SelectWithLabel = ({
	name,
	label,
	required,
	register,
	list,
	classname,
}) => {
	return (
		<FormControl fullWidth>
			<InputLabel
				size="small"
				required={required}
				id="demo-simple-select-label"
			>
				{label}
			</InputLabel>
			<Select
				size="small"
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				label={label}
				className={classname}
				defaultValue=""
				required={required}
				{...register(name, { required })}
				MenuProps={{
					PaperProps: {
						style: {
							maxHeight: 500,
						},
					},
				}}
			>
				{list?.map((item, i) => (
					<MenuItem key={i} value={item?.id}>
						{item?.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default SelectWithLabel;

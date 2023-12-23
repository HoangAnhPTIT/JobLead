import { Clear } from "@mui/icons-material";
import { FormControl, MenuItem, OutlinedInput, Select } from "@mui/material";
import { useState } from "react";

const SelectControllerWithoutLabel = ({
	name,
	placeholder,
	list,
	classname,
	valueKey = "id",
	Controller,
	control,
}) => {
	const [valueSelected, setValueSelected] = useState(false);

	return (
		<FormControl fullWidth>
			<Controller
				name={name}
				control={control}
				defaultValue=""
				render={({ field }) => (
					<Select
						displayEmpty
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
									{list?.find((item) => item?.id === selected)?.name}{" "}
								</span>
							) : (
								<span className="text-placeholder">{placeholder}</span>
							)
						}
						endAdornment={
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
						}
					>
						{list?.map((item, i) => (
							<MenuItem key={i} value={item?.[valueKey]}>
								{item?.name}
							</MenuItem>
						))}
					</Select>
				)}
			/>
		</FormControl>
	);
};

export default SelectControllerWithoutLabel;

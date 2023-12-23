import { FormControl, MenuItem, Select } from "@mui/material";

const SelectWithoutLabel = ({
	name,
	placeholder,
	register,
	list,
	classname,
	valueKey = "id",
}) => {
	return (
		<FormControl fullWidth>
			<Select
				size="small"
				displayEmpty
				renderValue={(selected) =>
					selected ? (
						<span>{list?.find((item) => item?.id === selected)?.name}</span>
					) : (
						<span className="text-placeholder">{placeholder}</span>
					)
				}
				className={classname}
				defaultValue=""
				{...register(name)}
				MenuProps={{
					PaperProps: {
						style: {
							maxHeight: 500,
						},
					},
				}}
			>
				{list?.map((item, i) => (
					<MenuItem key={i} value={item?.[valueKey]}>
						{item?.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default SelectWithoutLabel;

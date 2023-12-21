import { Box, Chip } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: 500,
		},
	},
};

export default function MultipleSelectWithLabel({
	label,
	name,
	required,
	list,
	register,
}) {
	return (
		<div>
			<FormControl fullWidth>
				<InputLabel size="small" required={required}>
					{label}
				</InputLabel>
				<Select
					multiple
					defaultValue={[]}
					size="small"
					input={<OutlinedInput label={label} required={required} />}
					renderValue={(selected) => (
						<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
							{selected.map((value, i) => (
								<Chip
									size="small"
									key={i}
									label={list?.find((item) => item?.id === value)?.name}
								/>
							))}
						</Box>
					)}
					MenuProps={MenuProps}
					{...register(name, { required })}
				>
					{list?.map((item, i) => (
						<MenuItem key={i} value={item?.id}>
							{item?.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}

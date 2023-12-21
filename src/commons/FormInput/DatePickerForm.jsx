import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Controller } from "react-hook-form";

export default function DatePickerForm({ label, name, required, control }) {
	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<Controller
				name={name}
				control={control}
				rules={{ required }}
				defaultValue={null}
				render={({ field }) => (
					<DatePicker
						{...field}
						label={label}
						format="DD/MM/YYYY"
						slotProps={{
							textField: { size: "small", fullWidth: true, required },
						}}
					/>
				)}
			/>
		</LocalizationProvider>
	);
}

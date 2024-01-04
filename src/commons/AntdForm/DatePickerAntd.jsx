import { DatePicker } from "antd";

const DatePickerAntd = ({
	form: Form,
	name,
	label,
	placeholder = "",
	...option
}) => {
	return (
		<Form.Item
			label={label}
			name={name}
			rules={[{ required: true }]}
			{...option}
		>
			<DatePicker
				size="large"
				placeholder={placeholder}
				format="DD/MM/YYYY"
				className="w-full"
			/>
		</Form.Item>
	);
};

export default DatePickerAntd;

import { DatePicker } from "antd";

const DatePickerAntd = ({ form: Form, name, label, ...option }) => {
	return (
		<Form.Item
			label={label}
			name={name}
			rules={[{ required: true }]}
			{...option}
		>
			<DatePicker size="large" placeholder="" className="w-full" />
		</Form.Item>
	);
};

export default DatePickerAntd;

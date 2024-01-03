import { CaretDownOutlined } from "@ant-design/icons";
import { Select } from "antd";
import React from "react";

const SelectAntd = ({
	form: Form,
	name,
	label,
	placeholder = "",
	valueKey = "id",
	nameKey = "name",
	list,
	...option
}) => {
	return (
		<Form.Item name={name} label={label} {...option}>
			<Select
				showSearch
				size="large"
				suffixIcon={<CaretDownOutlined />}
				placeholder={placeholder}
				fieldNames={{ label: nameKey, value: valueKey }}
				options={list}
				filterOption={(inputValue, option) =>
					(option?.[nameKey]?.toLowerCase() ?? "").includes(
						inputValue.toLowerCase()
					)
				}
			/>
		</Form.Item>
	);
};

export default SelectAntd;

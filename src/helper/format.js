import { isEmpty } from "lodash";
import moment from "moment";

export const formatNumber = (value) => new Intl.NumberFormat().format(value);

export const convertArrayToObject = (array, key) => {
	const newObj =
		array?.reduce((obj, item) => ({ ...obj, [item[key]]: item }), {}) || {};
	return newObj;
};
export const getArrayObjectValue = (array, key = "id") => {
	const values = array?.map((item) => item[key]);
	return values;
};

export const paramValue = (param) => (param !== "0" ? param : "");
export const getDate = (date) =>
	date ? moment(date).format("DD/MM/YYYY") : "";

export const replaceArrayValue = (array, value, index) => {
	const newArr = isEmpty(array) ? [] : [...array];
	if (index !== null) {
		newArr[index] = value;
	} else {
		newArr.push(value);
	}

	return newArr;
};

export const removeArrayValue = (array, value) => {
	return array?.filter((item) => item !== value);
};

export const getTimeValue = (value) => (value ? moment(value) : null);

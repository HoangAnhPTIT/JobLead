import dayjs from "dayjs";
import { isEmpty } from "lodash";

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

export const paramValue = (param) => (param !== "0" ? param : undefined);
export const getDate = (date) => (date ? dayjs(date).format("DD/MM/YYYY") : "");

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

export const getTimeValue = (value) => (value ? dayjs(value) : null);

export const genUrlParams = (basePath, objectParams) => {
	Object.keys(objectParams).forEach((key) => {
		if (objectParams[key] === null || objectParams[key] === undefined) {
			delete objectParams[key];
		}
	});
	return `${basePath}?${new URLSearchParams(objectParams)}`;
};

export const genArrayData = (items) =>
	items?.map((item, i) => `${i > 0 ? ", " : ""}${item || ""}`);

export const convertSearchParamsToObject = (searchParams) => {
	return JSON?.parse(
		'{"' +
			decodeURI(
				searchParams
					.toString()
					?.replace(/&/g, '","')
					?.replace(/=/g, '":"')
					?.replaceAll("+", " ")
			) +
			'"}'
	);
};

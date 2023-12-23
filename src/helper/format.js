export const formatNumber = (value) => new Intl.NumberFormat().format(value);

export const convertArrayToObject = (array, key) => {
	const newObj =
		array?.reduce((obj, item) => ({ ...obj, [item[key]]: item }), {}) || {};
	return newObj;
};

export const paramValue = (param) => (param !== "0" ? param : "");

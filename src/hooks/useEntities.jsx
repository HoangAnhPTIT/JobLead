import { useEffect, useState } from "react";
import { httpGet } from "src/apis/apiCaller";
import { apiEntity } from "src/apis/apiEndpoint";

const convertEntitiesData = (entitiesObject) => {
	const newObj =
		entitiesObject?.reduce(
			(obj, item) => ({ ...obj, [item?.key]: item?.value }),
			{}
		) || {};
	return newObj;
};

const useEntities = () => {
	const [entities, setEntities] = useState({});

	useEffect(() => {
		const getOptionValues = async () => {
			try {
				const data = await httpGet(apiEntity);
				const dataConverted = await convertEntitiesData(data?.data);
				setEntities(dataConverted);
			} catch (error) {
				console.error("getEntityError", error);
			}
		};
		getOptionValues();
	}, []);

	return entities;
};

export default useEntities;

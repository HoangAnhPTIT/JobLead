"use client";
import { useState } from "react";
import InfoModal from "./InfoModal";
import LeadTable from "./LeadTable";

const Category = () => {
	const [itemSelected, setItemSelected] = useState();
	const [loading, setLoading] = useState(false);
	const [triggerReload, setTriggerReload] = useState(false);

	const onTrigger = () => {
		setTriggerReload(!triggerReload);
	};

	return (
		<div>
			<LeadTable
				setItemSelected={setItemSelected}
				triggerReload={triggerReload}
			/>
			<InfoModal
				loading={loading}
				setLoading={setLoading}
				itemSelected={itemSelected}
				setItemSelected={setItemSelected}
				reload={onTrigger}
			/>
		</div>
	);
};

export default Category;

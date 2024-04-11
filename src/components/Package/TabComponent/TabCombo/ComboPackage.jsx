import { ArrowForwardIos } from "@mui/icons-material";
import { Collapse } from "antd";
import classNames from "classnames";
import HotCombo from "./HotCombo";
import GoodCombo from "./GoodCombo";
import SaveCombo from "./SaveCombo";

const ComboPackage = ({ setCart }) => {
	const comboInfo = [
		{
			key: 1,
			label: <span className="text-primary font-semibold">COMBO HOT</span>,
			children: <HotCombo setCart={setCart} />,
		},
		{
			key: 2,
			label: <span className="text-primary font-semibold">COMBO HẤP DẪN</span>,
			children: <GoodCombo setCart={setCart} />,
		},
		{
			key: 3,
			label: (
				<span className="text-primary font-semibold">COMBO TIẾT KIỆM</span>
			),
			children: <SaveCombo setCart={setCart} />,
		},
	];

	return (
		<div className="border p-5">
			<Collapse
				defaultActiveKey="1"
				expandIconPosition="right"
				items={comboInfo}
				expandIcon={({ isActive }) => (
					<ArrowForwardIos
						className={classNames(
							"!text-primary !text-lg",
							!isActive ? "rotate-90" : "-rotate-90"
						)}
					/>
				)}
			/>
		</div>
	);
};

export default ComboPackage;

const PrivateInfo = ({ info, icon, label, css = "text-33" }) => {
	return (
		<p>
			{icon}
			{info ? (
				<span className={css}>{info}</span>
			) : (
				<span className="text-placeholder">{label}</span>
			)}
		</p>
	);
};

export default PrivateInfo;

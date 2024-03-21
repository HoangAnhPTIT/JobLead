const ShowDescription = ({ description }) => {
	return (
		<>
			{description.split("\n").map((line, i) => (
				<p key={i}>{line}</p>
			))}
		</>
	);
};

export default ShowDescription;

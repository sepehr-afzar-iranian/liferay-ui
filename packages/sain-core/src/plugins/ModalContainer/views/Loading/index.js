import React from "react";
import Rodal from "rodal";
import ClayLoadingIndicator from "@clayui/loading-indicator";

function Loading(props) {
	const { visible, options } = props;

	return (
		<Rodal
			className="flex-rodal"
			visible={visible}
			onClose={() => {}}
			showCloseButton={false}
			closeMaskOnClick={false}
			closeOnEsc={false}
			customStyles={{ minWidth: "auto" }}
			{...options}
		>
			<div
				className="p-5"
				style={{
					background: "#fff",
					borderRadius: 15,
					boxShadow: "0 1px 3px rgba(0,0,0,.2)",
				}}
			>
				<ClayLoadingIndicator />
			</div>
		</Rodal>
	);
}

export default Loading;

import React, { Fragment } from "react";
import { useStore, useActions, MODAL, REMOVE } from "@sainui/context";
// Views
import Alert from "./views/Alert/index";
import Loading from "./views/Loading/index";
// Styles
import "./styles/Rodal.css";
import "./styles/FlexRodal.css";

function ModalContainer() {
	const { modal } = useStore(),
		action = useActions(),
		closeAction = () => {
			action({
				type: MODAL,
				payload: { ...modal, visible: false },
			});
		};

	if (modal) {
		const { target } = modal;

		let { options } = modal;
		const duration = (options && options.duration) || 300;

		if (!options) options = { animation: "door" };
		else if (!options.animation) options.animation = "door";
		modal.options = options;

		return (
			<Fragment>
				{target === "alert" && (
					<Alert
						{...modal}
						closeAction={() => {
							closeAction();
							setTimeout(() => {
								action({
									type: REMOVE,
									path: "modal",
								});
							}, duration);
						}}
					/>
				)}
				{target === "loading" && <Loading {...modal} />}
			</Fragment>
		);
	} else return "";
}

export default ModalContainer;

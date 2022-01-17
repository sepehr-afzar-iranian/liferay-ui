import React, { Fragment } from "react";
import ClayAlert from "@clayui/alert";
import { useActions, useStore, REMOVE } from "@sainui/context";
import Transition from "../Transition/index";
import "./styles/Toast.css";

function ToastContainer() {
	const { app } = useStore(); // for rerender
	const action = useActions();

	// one toast container ( fix conflite in liferay page )
	document.querySelectorAll(".portlet .alert-container").forEach((container) => {
		container.classList.add("d-none");
		if (container.id === app.id) container.classList.remove("d-none");
	});

	return window.TOAST ? (
		<Fragment>
			<ClayAlert.ToastContainer id={`${app.id}`}>
				{window.TOAST.map((item, index) => (
					<Transition key={index}>
						<ClayAlert
							onClose={() => {
								window.TOAST = window.TOAST.filter((toast) => toast !== item);
								action({
									type: REMOVE,
									path: `toast[${index}]`,
								});
							}}
							{...item}
						>
							<br />
							{item.value}
						</ClayAlert>
					</Transition>
				))}
			</ClayAlert.ToastContainer>
			<svg display="none">
				<symbol id="times" viewBox="0 0 512 512" fill="currentColor">
					<path
						className="lexicon-icon-outline"
						d="M301.1,256.1L502.3,54.9c30.1-30.1-16.8-73.6-45.2-45.2L255.9,210.8L54.6,9.7C24.6-20.4-19,26.5,9.4,54.9l201.2,201.2L9.3,457.3c-28.9,28.9,15.8,74.6,45.2,45.2l201.3-201.2l201.3,201.2c28.9,28.9,74.2-16.3,45.2-45.2L301.1,256.1z"
					></path>
				</symbol>

				<symbol id="exclamation-full" viewBox="0 0 24 24">
					<path d="M12 3A9 9 0 1 0 12 21A9 9 0 1 0 12 3Z" opacity=".15"></path>
					<path d="M12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10s10-4.477,10-10C22,6.477,17.523,2,12,2z M12,20c-4.418,0-8-3.582-8-8c0-4.418,3.582-8,8-8s8,3.582,8,8C20,16.418,16.418,20,12,20z"></path>
					<path d="M11 15H13V17H11zM11 7H13V13H11z"></path>
				</symbol>

				<symbol id="warning-full" viewBox="0 0 24 24">
					<path
						d="M12,1L3,5c0,0,0,4,0,6c0,7.83,6.439,11.486,9,12c2.561-0.514,9-4.17,9-12c0-2,0-6,0-6L12,1z"
						opacity=".15"
					></path>
					<path d="M12,1L3,5c0,0,0,4,0,6c0,7.83,6.439,11.486,9,12c2.561-0.514,9-4.17,9-12c0-2,0-6,0-6L12,1z M19,11 c0,6.134-4.785,9.254-7,9.937C9.785,20.254,5,17.134,5,11V6.3l7-3.111L19,6.3V11z"></path>
					<path d="M11 6H13V14H11zM11 16H13V18H11z"></path>
				</symbol>

				<symbol id="info-circle" viewBox="0 0 24 24">
					<path d="M12 3A9 9 0 1 0 12 21A9 9 0 1 0 12 3Z" opacity=".15"></path>
					<path d="M13,17h-2v-6h2V17z M13,9h-2V7h2V9z"></path>
					<path
						fill="none"
						stroke="#2e5aac"
						strokeMiterlimit="10"
						strokeWidth="2"
						d="M12 3A9 9 0 1 0 12 21A9 9 0 1 0 12 3Z"
					></path>
				</symbol>

				<symbol id="check-circle-full" viewBox="0 0 24 24">
					<path d="M19.8,10.4c0.1,0.5,0.2,1.1,0.2,1.6c0,4.4-3.6,8-8,8s-8-3.6-8-8s3.6-8,8-8c1.6,0,3.2,0.5,4.4,1.3l1.4-1.4 C16.2,2.7,14.2,2,12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10c0-1.1-0.2-2.2-0.5-3.2L19.8,10.4z"></path>
					<path d="M11 16.4L6.3 11.7 7.7 10.3 11 13.6 21.3 3.3 22.7 4.7z"></path>
					<path d="M12 2A10 10 0 1 0 12 22A10 10 0 1 0 12 2Z" opacity=".15"></path>
				</symbol>

				<symbol id="undefined" viewBox="0 0 24 24">
					<path d="M18.091 2.082l-1.218 1.584C18.771 5.128 20 7.418 20 10h2C22 6.772 20.464 3.91 18.091 2.082zM5.909 2.082l1.218 1.584C5.229 5.128 4 7.418 4 10H2C2 6.772 3.536 3.91 5.909 2.082zM13.5 5h-3V3.5C10.5 2.672 11.172 2 12 2h0c.828 0 1.5.672 1.5 1.5V5z"></path>
					<path d="M12,6c2.206,0,4,1.794,4,4v6v0.828L16.172,17H7.828L8,16.828V16v-6C8,7.794,9.794,6,12,6 M12,4c-3.314,0-6,2.686-6,6v6l-2,2v1h16v-1l-2-2v-6C18,6.686,15.314,4,12,4L12,4z"></path>
					<path d="M12 18A2 2 0 1 0 12 22A2 2 0 1 0 12 18Z"></path>
					<path d="M12,5L12,5c-2.761,0-5,2.239-5,5v8h10v-8C17,7.239,14.761,5,12,5z" opacity=".15"></path>
				</symbol>
			</svg>
		</Fragment>
	) : (
		""
	);
}

export default ToastContainer;

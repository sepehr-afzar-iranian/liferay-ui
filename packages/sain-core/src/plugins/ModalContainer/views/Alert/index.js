import React from "react";
import Rodal from "rodal";

function Alert(props) {
	const {
			visible,
			options,
			title,
			description,
			closeAction,
			onClose,
			onAccept,
			cancelText,
			acceptText,
			closeOnCancel,
			customStyles,
			noTheme,
		} = props,
		onCancel = closeOnCancel ? closeAction : props.onCancel;

	return (
		<Rodal
			className="flex-rodal"
			visible={visible}
			onClose={() => {
				if (onClose) onClose();
				closeAction();
			}}
			customStyles={customStyles}
			{...options}
		>
			<div className={!noTheme && "rodal-content"}>
				<div className={`${noTheme !== true && "p-5"}`}>
					{title && <h2 className="text-black mb-3">{title}</h2>}
					{description && <div style={{ lineHeight: 1.5 }}>{description}</div>}
				</div>

				{options && options.showCloseButton === false && !onCancel && !onAccept && (
					<button
						className={`btn-clean btn-ahref btn-block font-weight-medium p-3 divider-top`}
						onClick={onClose || closeAction}
					>
						{acceptText || "بستن"}
					</button>
				)}

				{!onCancel && onAccept && (
					<button
						className={`btn-clean btn-ahref btn-block font-weight-medium p-3 divider-top`}
						onClick={onAccept}
					>
						{acceptText || "باشه"}
					</button>
				)}

				{onCancel && onAccept && (
					<div className="d-flex btn-clean-group">
						<button
							className={`btn-clean text-danger font-weight-medium p-3 divider-top w-100`}
							style={{ padding: "0.6rem 0 0.7rem 0 !important" }}
							onClick={() => {
								if (onClose) onClose();
								if (onCancel) onCancel();
							}}
						>
							{cancelText || "بستن"}
						</button>

						<button
							className={`btn-clean text-primary font-weight-medium p-3 divider-top w-100`}
							style={{ padding: "0.6rem 0 0.7rem 0 !important" }}
							onClick={() => {
								if (onClose) onClose();
								if (onAccept) onAccept();
							}}
						>
							{acceptText || "باشه"}
						</button>
					</div>
				)}
			</div>
			{noTheme && <style>{".rodal-close::before, .rodal-close::after { background: #fff; }"}</style>}
		</Rodal>
	);
}

export default Alert;

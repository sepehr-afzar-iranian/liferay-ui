import React from "react";
import "./styles/transition.css";

export default function Transition(props) {
	const reference = React.useRef(null);
	const type = props.type || "zoom";
	React.useEffect(() => {
		window.requestAnimationFrame(function () {
			if (reference.current) reference.current.classList.add(`transition-${type}-active`);
		});
	});
	return (
		<div ref={reference} className={`transition-${type}`}>
			{props.children}
		</div>
	);
}

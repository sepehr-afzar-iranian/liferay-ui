import React from "react";
import "./styles/Transition.css";

export default function Transition(props) {
	const reference = React.useRef(null);
	React.useEffect(() => {
		window.requestAnimationFrame(function () {
			reference.current.classList.add("route-transition-active");
		});
	});
	return (
		<div ref={reference} className="route-transition">
			{props.children}
		</div>
	);
}

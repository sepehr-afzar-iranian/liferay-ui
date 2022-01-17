import React from "react";
import LaptopIcon from "./svg/Laptop";

export default function ErrorPage({ error, componentStack }) {
	return (
		<div className="container" style={{ color: "#444b54", textAlign: "center" }}>
			<div className="py-3 text-center">
				<LaptopIcon />

				<h3 className="mt-4 mb-2" style={{ fontSize: "2rem", fontWeight: 400 }}>
					خطایی رخ داده است
				</h3>

				<p className="lead" style={{ fontWeight: 300, lineHeight: 1.5, opacity: 0.7 }}>
					در روند اجرای دستورات خطایی رخ داده است، لطفا مشکل را گزارش دهید
				</p>

				<div
					className="alert alert-danger mt-4"
					style={{ fontSize: "1rem", textAlign: "left", display: componentStack ? "block" : "inline-block" }}
				>
					<p className="mb-0 text-danger">{error.toString()}</p>
					<pre className="m-0">{componentStack}</pre>
				</div>
			</div>
		</div>
	);
}

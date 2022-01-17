import { useEffect } from "react";
import { useStore } from "@sainui/context";
import axios from "axios";

function Debug() {
	const { app, ...store } = useStore();

	useEffect(() => {
		console.groupCollapsed("APP");
		Object.keys(app).map((key) => console.info(`${key}: `, app[key]));
		console.groupEnd();
	}, []);

	const { Authorization } = axios.defaults.headers.common;
	useEffect(() => {
		if (Authorization) {
			console.groupCollapsed("TOKEN");
			console.info(Authorization);
			console.groupEnd();
		}
	}, [Authorization]);

	useEffect(() => {
		console.groupCollapsed("STORE");
		console.info("APP");
		Object.keys(store).map((key) => console.info(`${key}: `, store[key]));
		console.groupEnd();
	}, [JSON.stringify(store)]);

	return "";
}

export default Debug;

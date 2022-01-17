import { useEffect } from "react";
import { useStore } from "@sainui/context";

function Cache() {
	const store = useStore();
	useEffect(() => {
		localStorage.setItem("store", JSON.stringify(store));
	}, [store]);
	return "";
}

export default Cache;

export default () => {
	const persianNumbers = { 0: "۰", 1: "۱", 2: "۲", 3: "۳", 4: "۴", 5: "۵", 6: "۶", 7: "۷", 8: "۸", 9: "۹" };
	function traverse(element, exepts) {
		if (element) {
			if (element.nodeType === 3 && !exepts.includes(element.parentNode.className)) {
				const list = element.data.match(/[0-9]/g);
				if (list !== null && list.length !== 0)
					for (let i = 0; i < list.length; i++)
						element.data = element.data.replace(list[i], persianNumbers[list[i]]);
			}
			for (let i = 0; i < element.childNodes.length; i++) traverse(element.childNodes[i], exepts);
		}
	}
	setInterval(() => traverse(document.querySelector("main.portlet-wrapper"), ["filepond--file-status-main"]), 100);
};

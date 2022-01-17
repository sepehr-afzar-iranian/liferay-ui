export default function internationalization(app) {
	const _locale = app.locale && app.locale !== "en" ? `_${app.locale}` : "";
	// const properties_raw = require(`../../../../packages/${app.name}/features/localization/Language${_locale}.properties`);
	// const properties_rows = properties_raw.default.split("\r\n");
	const properties = [];

	// properties_rows.map((row) => {
	// 	const tmp = row.split("=");
	// 	if (tmp[1]) properties[tmp[0]] = tmp[1];
	// });

	window.Liferay = {
		Language: {
			get(key, params) {
				if (!properties[key]) return key;
				else if (!params) return properties[key];
				// else
				let row = properties[key];
				params.map((param, index) => {
					row = row.replace(`{${index}}`, param);
				});
				return row;
			},
		},
	};

	window.themeDisplay = {
		getLanguageId() {
			return app.locale && app.locale === "fa" ? "fa_IR" : "en_US";
		},
	};
}

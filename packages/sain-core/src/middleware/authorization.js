import axios from "axios";
import qs from "qs";

export default (app) => {
	// const requestClientCredentialsAccessToken = (callback) => {
	axios
		.post(
			`/o/oauth2/token`,
			qs.stringify({
				client_id: app.token.client_id,
				client_secret: app.token.client_secret,
				grant_type: "client_credentials",
			}),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		)
		.then((response) => {
			axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
			axios.defaults.headers.common["Cache-Control"] = "no-cache";
			// callback(response.data);
		});
	// };

	// requestClientCredentialsAccessToken((data) => {
	// 	setInterval(() => {
	// 		axios.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;
	// 		console.log("Token: ", data.access_token);
	// 	}, data.expires_in * 1000);
	// });
};

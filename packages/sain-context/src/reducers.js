import { SET, ADD, REMOVE, UPDATE, MODAL, REFRESH, TOAST } from "./actions";
import removeEmptySlots from "./utils/removeEmptySlots";
import merge from "lodash/merge";
import mergeWith from "lodash/mergeWith";
import isArray from "lodash/isArray";
import update from "lodash/update";
import unset from "lodash/unset";
import set from "lodash/set";
import get from "lodash/get";

const reducers = (state = [], action) => {
	const newState = { ...state };
	const { type, path, payload } = action;

	switch (type) {
		case SET:
			if (path) {
				set(newState, path, payload);
				return newState;
			} else return { app: state.app, ...payload };

		case ADD:
			var prev = get(newState, path);
			var next = action.prepend ? [payload, ...prev] : [...prev, payload];
			set(newState, path, next);
			return newState;

		case REMOVE:
			unset(newState, path);
			return removeEmptySlots(newState, path);

		case UPDATE:
			return update(newState, path, (item) => merge(item, payload));

		case MODAL:
			if (payload.visible === undefined) payload.visible = true;
			return { ...newState, modal: payload };

		case REFRESH:
			return merge(newState, { refresh: Math.random() });

		case TOAST:
			window.TOAST = window.TOAST ? window.TOAST.concat(payload) : [payload];
			return mergeWith(newState, { toast: [payload] }, function (a, b) {
				if (isArray(a)) return a.concat(b);
			});

		default:
			return state;
	}
};
export default reducers;

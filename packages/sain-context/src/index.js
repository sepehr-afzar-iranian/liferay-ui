import React, { useReducer, createContext, useContext } from "react";
import reducers from "./reducers";
export * from "./actions";

const ActionsContext = createContext();
export const StoreContext = createContext();

export const useActions = () => useContext(ActionsContext);
export const useStore = () => useContext(StoreContext);

//  just test

export const StoreProvider = (props) => {
	const initialState = reducers(props.value, { type: "__INIT__" });
	const [state, dispatch] = useReducer(reducers, initialState);

	return (
		<StoreContext.Provider value={state}>
			<ActionsContext.Provider value={dispatch}>{props.children}</ActionsContext.Provider>
		</StoreContext.Provider>
	);
};

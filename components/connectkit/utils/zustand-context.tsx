import { StoreApi } from "zustand";
import createContext from "zustand/context";
import React from "react";

export function createContextStore<S extends StoreApi<unknown>>(
	createStore: () => S
) {
	const { Provider: ZustandProvider, useStore } = createContext<S>();
	const ResetContext = React.createContext(() => {});

	return [
		function StoreContextProvider({ children }: React.PropsWithChildren) {
			const [key, setKey] = React.useState(0);
			const resetStore = React.useCallback(() => setKey((k) => k + 1), []);

			return (
				<ResetContext.Provider value={resetStore}>
					<ZustandProvider key={key} createStore={createStore}>
						{children}
					</ZustandProvider>
				</ResetContext.Provider>
			);
		},

		useStore,

		function useResetStore() {
			return React.useContext(ResetContext);
		},
	] as const;
}

export function withMultipleProviders(
	...Providers: React.ComponentType<React.PropsWithChildren>[]
) {
	return function MultipleContexts({
		children,
	}: Required<React.PropsWithChildren>) {
		return Providers.reduce(
			(node, Provider) => <Provider>{node}</Provider>,
			children
		) as JSX.Element;
	};
}

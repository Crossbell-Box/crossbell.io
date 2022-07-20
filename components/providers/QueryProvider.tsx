import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function QueryProvider({ children }: PropsWithChildren) {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools />
			{children}
		</QueryClientProvider>
	);
}

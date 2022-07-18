import { useAccount as useAccount_, useConnect } from "wagmi";

// export function useSafeAccount() {
// 	const acc = useAccount_();

// 	const { isConnected } = useConnect();

// 	if (isConnected) {
// 		return acc;
// 	} else {
// 		return {
// 			...acc,
// 			data: {
// 				...acc.data,
// 				address: "0x0000000000000000000000000000000000000000",
// 			},
// 		};
// 	}
// }

import { Socket } from "phoenix";
import once from "lodash.once";

export const scanSocket = once(() => {
	const socket = new Socket("wss://scan.crossbell.io/socket", {
		params: { locale: "en" },
	});

	socket.connect();

	return socket;
});

export const newAddressChannel = once(() => {
	const channel = scanSocket().channel("addresses:new_address");

	channel.join();

	return channel;
});

export const newBlocksChannel = once(() => {
	const channel = scanSocket().channel("blocks:new_block");

	channel.join();

	return channel;
});

export const newTransactionChannel = once(() => {
	const channel = scanSocket().channel("transactions:new_transaction");

	channel.join();

	return channel;
});

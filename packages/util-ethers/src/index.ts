export const truncateAddress = (address?: string) => {
	if (!address) {
		return "0xUNKNOWN";
	}

	return (
		address.substring(0, 6) + "..." + address.substring(address.length - 4)
	);
};

export const NIL_ADDRESS = "0x0000000000000000000000000000000000000000";

export const isAddressEqual = (address1?: string, address2?: string) => {
	if (!address1 || !address2) {
		return false;
	}

	return address1.toLowerCase() === address2.toLowerCase();
};

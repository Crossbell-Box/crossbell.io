export type TruncateAddressOptions = {
	start?: number;
	end?: number;
};

export const truncateAddress = (
	address?: string,
	options?: TruncateAddressOptions
) => {
	if (!address) {
		return "0xUNKNOWN";
	}

	const ellipsis = "...";
	const start = options?.start ?? 6;
	const end = options?.end ?? 4;

	const [, startStr, endStr] =
		new RegExp(`^(.{${start}}).+(.{${end}})$`).exec(address) ?? [];

	return [startStr, endStr].filter(Boolean).join(ellipsis) || address;
};

export const NIL_ADDRESS = "0x0000000000000000000000000000000000000000";

export const isAddressEqual = (address1?: string, address2?: string) => {
	if (!address1 || !address2) {
		return false;
	}

	return address1.toLowerCase() === address2.toLowerCase();
};

export const truncateAddress = (address?: string) => {
  if (!address) {
    return "0xUNKNOWN";
  }

  return (
    address.substring(0, 6) + "..." + address.substring(address.length - 4)
  );
};

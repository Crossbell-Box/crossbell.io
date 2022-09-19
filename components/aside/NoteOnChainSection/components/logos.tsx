import { Text } from "@mantine/core";
import Image from "next/image";
import React from "react";

export const CrossbellLogo = () => (
	<Image width={19} height={19} src="/images/logo.svg" alt="Crossbell Logo" />
);

export const IPFSLogo = () => (
	<Image width={24} height={24} src="/logos/ipfs.png" alt="Ipfs Logo" />
);

export const SourceLogo = () => (
	<Text className="i-csb:access-point text-24px" />
);

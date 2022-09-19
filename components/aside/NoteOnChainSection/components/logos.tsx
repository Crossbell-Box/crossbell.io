import { Text } from "@mantine/core";
import Image from "next/image";
import React from "react";

import crossbellLogoUrl from "@/public/images/logo.svg";
import ipfsLogoUrl from "@/public/logos/ipfs.png";

export const CrossbellLogo = () => (
	<Image width={19} height={19} src={crossbellLogoUrl} alt="Crossbell Logo" />
);

export const IPFSLogo = () => (
	<Image width={24} height={24} src={ipfsLogoUrl} alt="Ipfs Logo" />
);

export const SourceLogo = () => (
	<Text className="i-csb:access-point text-24px" />
);

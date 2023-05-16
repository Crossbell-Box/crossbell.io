import React from "react";
import Image, { ImageProps } from "next/image";

import starImg from "./star.svg";

export function Star(props: Partial<ImageProps>) {
	return <Image src={starImg} alt="Star" {...props} />;
}

import dynamic from "next/dynamic";
import "plyr-react/plyr.css";
import { ComponentProps } from "react";

export default function VideoPlayer({ ...props }: ComponentProps<typeof Plyr>) {
	const Plyr = dynamic(() => import("plyr-react"), { ssr: false });

	return <Plyr {...props} />;
}

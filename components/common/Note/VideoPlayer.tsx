import dynamic from "next/dynamic";
import "plyr-react/plyr.css";
import { ComponentProps } from "react";
const Plyr = dynamic(() => import("plyr-react"), { ssr: false });

export default function VideoPlayer({ ...props }: ComponentProps<typeof Plyr>) {
	return <Plyr {...props} />;
}

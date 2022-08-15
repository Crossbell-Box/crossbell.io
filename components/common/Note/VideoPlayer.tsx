import dynamic from "next/dynamic";
const Plyr = dynamic(() => import("plyr-react"), { ssr: false });
import "plyr-react/plyr.css";
import { ComponentProps } from "react";

export default function VideoPlayer({ ...props }: ComponentProps<typeof Plyr>) {
	return <Plyr {...props} />;
}

import { domAnimation, LazyMotion } from "framer-motion";
import dynamic from "next/dynamic";

import Loading from "./components/Loading";

const LazyIndex = dynamic(() => import("./lazy"), { loading: Loading });

export default function Index() {
	return (
		<LazyMotion features={domAnimation} strict>
			<LazyIndex />
		</LazyMotion>
	);
}

import dynamic from "next/dynamic";

import Loading from "./components/Loading";

const LazyIndex = dynamic(() => import("./lazy"), { loading: Loading });

export default LazyIndex;

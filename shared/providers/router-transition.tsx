import React, { useEffect } from "react";
import { useRouter } from "next/router";
import {
	startNavigationProgress,
	resetNavigationProgress,
	NavigationProgress,
} from "@mantine/nprogress";

export function RouterTransition() {
	const router = useRouter();

	useEffect(() => {
		const handleStart = (url: string) =>
			url !== router.asPath && startNavigationProgress();
		const handleComplete = () => resetNavigationProgress();

		router.events.on("routeChangeStart", handleStart);
		router.events.on("routeChangeComplete", handleComplete);
		router.events.on("routeChangeError", handleComplete);

		return () => {
			router.events.off("routeChangeStart", handleStart);
			router.events.off("routeChangeComplete", handleComplete);
			router.events.off("routeChangeError", handleComplete);
		};
	}, [router.asPath, router.events]);

	return <NavigationProgress size={5} />;
}

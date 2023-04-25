import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRefCallback } from "@crossbell/util-hooks";
import { useQuery } from "@tanstack/react-query";
import { faucetGetSiteKey } from "@crossbell/react-account/apis";

export function useReCAPTCHA() {
	const { data: siteKey } = useFaucetSiteKey();
	const ref = React.useRef<ReCAPTCHA>(null);
	const [token, setToken] = React.useState<string | null>(null);
	const [isLoaded, setIsLoaded] = React.useState(false);

	const handleReset = useRefCallback(() => setToken(""));
	const onLoad = useRefCallback(() => setIsLoaded(true));
	const reset = useRefCallback(() => ref.current?.reset());

	return {
		token,

		reset,

		isLoaded,

		node: !!siteKey && (
			<ReCAPTCHA
				size="normal"
				ref={ref}
				sitekey={siteKey}
				onChange={setToken}
				onExpired={handleReset}
				onReset={handleReset}
				asyncScriptOnLoad={onLoad}
			/>
		),
	};
}

function useFaucetSiteKey() {
	return useQuery(["faucet", "site-key"], faucetGetSiteKey);
}

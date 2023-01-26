import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRefCallback } from "@crossbell/util-hooks";

export type ReCAPTCHAContextType = {
	sitekey: string;
};

export const ReCAPTCHAContext =
	React.createContext<ReCAPTCHAContextType | null>(null);

export function useReCAPTCHA() {
	const sitekey = React.useContext(ReCAPTCHAContext)?.sitekey;
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

		node: !!sitekey && (
			<ReCAPTCHA
				size="normal"
				ref={ref}
				sitekey={sitekey}
				onChange={setToken}
				onExpired={handleReset}
				onReset={handleReset}
				asyncScriptOnLoad={onLoad}
			/>
		),
	};
}

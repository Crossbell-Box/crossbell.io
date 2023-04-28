let needSSR = true;

export function getNeedSSR() {
	return needSSR;
}

export function setNeedSSR(need: boolean) {
	needSSR = need;
}

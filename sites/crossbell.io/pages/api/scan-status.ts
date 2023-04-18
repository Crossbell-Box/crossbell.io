import type { NextApiRequest, NextApiResponse } from "next";
import { JSDOM } from "jsdom";

export type ScanStatusData = {
	averageBlockTime: string;
	transactionCount: number;
	blockCount: number;
	addressCount: number;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ScanStatusData>
) {
	const dom = await JSDOM.fromURL("https://scan.crossbell.io/");

	function getText(selector: string) {
		return (
			dom.window.document.querySelector(`[data-selector="${selector}"]`)
				?.textContent ?? ""
		).trim();
	}

	function getNumber(selector: string) {
		return Number(getText(selector).replace(/,/g, ""));
	}

	res.status(200).json({
		averageBlockTime: getText("average-block-time"),
		transactionCount: getNumber("transaction-count"),
		blockCount: getNumber("block-count"),
		addressCount: getNumber("address-count"),
	});
}

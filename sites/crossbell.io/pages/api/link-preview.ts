import { getLinkPreview } from "link-preview-js";
import { NextApiRequest, NextApiResponse } from "next";

const linkPreviewHandler = async (
	req: NextApiRequest,
	res: NextApiResponse<Awaited<ReturnType<typeof getLinkPreview>>>
) => {
	const { url } = req.query;
	try {
		const data = await getLinkPreview(String(url), {
			timeout: 1000,
			imagesPropertyType: "og",
			headers: {
				"user-agent": "googlebot", // Pretend self as a google bot
			},
		});
		// console.info("Data fetched successfully: ", data);
		res.json(data);
	} catch (e) {
		console.error("Failed to fetch metadata with error", e);
		res.json({
			url: String(url),
			mediaType: "failure",
			contentType: "unknown",
			favicons: [],
		});
	}
};

export default linkPreviewHandler;

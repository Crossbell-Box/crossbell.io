import { getLinkPreview } from "link-preview-js";
import { NextApiRequest, NextApiResponse } from "next";

const linkPreviewHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Awaited<ReturnType<typeof getLinkPreview>>>,
) => {
  const { url } = req.query;
  console.info("Fetching metadata for: ", url);
  const data = await getLinkPreview(String(url), {
    timeout: 1000,
    imagesPropertyType: "og",
    headers: {
      "user-agent": "googlebot", // Pretend self as a google bot
    },
  });
  res.json(data);
};

export default linkPreviewHandler;

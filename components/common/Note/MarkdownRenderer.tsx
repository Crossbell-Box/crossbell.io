import { PropsWithChildren, useEffect, useState } from "react";
import { Text, Title } from "@mantine/core";
import Image from "./../Image";
import ReactMarkdown from "react-markdown";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import { ipfsLinkToHttpLink } from "@/utils/ipfs";
import { useElementSize } from "@mantine/hooks";
import classNames from "classnames";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { useLinkPreview } from "@/utils/apis/link-preview";
import LinkPreviewCard, {LinkPreviewSkeleton} from "@/components/card/LinkPreviewCard";
import { Button } from "@mantine/core";

export function MarkdownRenderer({
	children,
	collapsible = false,
	...props
}: PropsWithChildren<
	{
		collapsible?: boolean;
	} & ReactMarkdownOptions
>) {
	const { ref, width, height } = useElementSize();

	const isExceeded = height > 500;

	const [collapsed, setCollapsed] = useState(collapsible);

	const showReadMoreButton = collapsed && isExceeded;

	const source =
		typeof children === "string" ? children.replace(/\n/g, "  \n") : children;

	return (
		<div className="relative">
			<div
				className={classNames(
					"markdown-renderer overflow-hidden transition-all-200 break-all",
					{
						"max-h-500px": collapsed,
						"max-h-none": !collapsed,
					}
				)}
				style={{
					WebkitMaskImage: showReadMoreButton
						? "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.9) 70%, rgba(0, 0, 0, 0) 95%, rgba(0, 0, 0, 0) 100%)"
						: undefined,
				}}
			>
				<div ref={ref}>
					<ReactMarkdown
						components={{
							h1: ({ node, ...props }) => <Title order={1} {...props} />,
							h2: ({ node, ...props }) => <Title order={2} {...props} />,
							h3: ({ node, ...props }) => <Title order={3} {...props} />,
							h4: ({ node, ...props }) => <Title order={4} {...props} />,
							h5: ({ node, ...props }) => <Title order={5} {...props} />,
							h6: ({ node, ...props }) => <Title order={6} {...props} />,
							p: ({ node, ...props }) => (
								<Text
									className="leading-1.25em my-2 break-words"
									style={{
										wordBreak: "break-word",
									}}
									{...props}
								/>
							),
							img: ({ node, ...props }) => {
								const src = ipfsLinkToHttpLink(props.src!);
								return (
									<div className="relative h-300px my-2">
										<Image
											src={src}
											layout="fill"
											onClick={(e) => {
												e.stopPropagation();
												window.open(src);
											}}
										/>
									</div>
								);
							},
							a: ({node, ...props}) => {
								// eslint-disable-next-line react-hooks/rules-of-hooks
								const { data, isLoading, isSuccess } = useLinkPreview(props.href);
								return isLoading ?
									(
										<LinkPreviewSkeleton />
									) : isSuccess && data && ("siteName" in data && data.siteName || "title" in data && data.title || "description" in data && data.description) ? (
										<LinkPreviewCard data={data} />
									) : (
										<a href={props.href} target={"_blank"} rel={"noreferrer"}>
											{props.children}
										</a>
									)
							},
						}}
						rehypePlugins={[rehypeRaw]}
						remarkPlugins={[remarkGfm]}
						{...props}
					>
						{source}
					</ReactMarkdown>
				</div>
			</div>

			{showReadMoreButton && (
				<div className="absolute left-0 right-0 bottom-0 z-10 flex items-center justify-center py-3">
					<Button radius={"xl"}>
						Read More
					</Button>
				</div>
			)}
		</div>
	);
}

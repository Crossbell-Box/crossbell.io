import { PropsWithChildren, useState } from "react";
import {
	Blockquote,
	Code,
	Divider,
	List,
	Mark,
	Table,
	Text,
	Title,
} from "@mantine/core";
import Image from "./../Image";
import ReactMarkdown from "react-markdown";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import { ipfsLinkToHttpLink } from "@/utils/ipfs";
import { useElementSize } from "@mantine/hooks";
import classNames from "classnames";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import { useLinkPreview } from "@/utils/apis/link-preview";
import LinkPreviewCard, {
	LinkPreviewSkeleton,
} from "@/components/card/LinkPreviewCard";
import { Button } from "@mantine/core";
import { isExternalUrl } from "@/utils/url";
import { CharacterHandle } from "../Character";

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

	let source = children;
	if (typeof children === "string") {
		if (collapsible) {
			source = collapseText(children);
		}
		source = forceBreakNewlines(source);
		source = transformMentions(source);
	}

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
							p: ({ node, ...props }) => {
								return (
									<Text
										className="leading-1.25em my-2 break-words"
										style={{ wordBreak: "break-word" }}
										{...props}
									/>
								);
							},
							img: ({ node, ...props }) => {
								const src = ipfsLinkToHttpLink(props.src!);
								return (
									<div className="relative h-300px my-2">
										<Image
											className="cursor-pointer"
											width={props.width}
											height={props.height}
											alt={props.alt}
											title={props.title}
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
							a: function Link({ node, ...props }) {
								const { data, isLoading, isSuccess } = useLinkPreview(
									props.href
								);
								return isLoading ? (
									<LinkPreviewSkeleton />
								) : isSuccess &&
								  data &&
								  (("siteName" in data && data.siteName) ||
										("title" in data && data.title) ||
										("description" in data && data.description)) ? (
									<LinkPreviewCard data={data} />
								) : (
									<Text
										variant="link"
										component="a"
										href={props.href}
										target={
											props.href && isExternalUrl(props.href)
												? "_blank"
												: undefined
										}
										rel="noreferrer"
									>
										{props.children}
									</Text>
								);
							},
							table: ({ node, ...props }) => {
								return (
									<Table striped highlightOnHover>
										{props.children}
									</Table>
								);
							},
							blockquote: ({ node, ...props }) => {
								return <Blockquote>{props.children}</Blockquote>;
							},
							code: ({ node, ...props }) => {
								return <Code>{props.children}</Code>;
							},
							pre: function Pre({ node, ...props }) {
								const { ref, width } = useElementSize();
								return (
									<div>
										<div ref={ref}></div>
										<Code
											block
											className="overflow-auto"
											style={{ maxWidth: width }}
										>
											{props.children}
										</Code>
									</div>
								);
							},
							ol: ({ node, ...props }) => {
								return <List type="ordered">{props.children}</List>;
							},
							ul: ({ node, ...props }) => {
								return <List type="unordered">{props.children}</List>;
							},
							li: ({ node, ...props }) => {
								return <List.Item>{props.children}</List.Item>;
							},
							mark: ({ node, ...props }) => {
								return <Mark>{props.children}</Mark>;
							},
							hr: ({ node, ...props }) => {
								return <Divider />;
							},
							// @ts-ignore
							"at-mention": ({ node, ...props }) => {
								return <CharacterHandle handle={props.handle} />;
							},
						}}
						rehypePlugins={[rehypeRaw]}
						remarkPlugins={[remarkGfm, remarkEmoji]}
						{...props}
					>
						{source}
					</ReactMarkdown>
				</div>
			</div>

			{showReadMoreButton && (
				<div className="absolute left-0 right-0 bottom-0 z-10 flex items-center justify-center py-3">
					<Button radius={"xl"}>Read More</Button>
				</div>
			)}
		</div>
	);
}

function collapseText(text: string, maxLength: number = 1000) {
	if (text.length <= maxLength) {
		return text;
	}
	return text.slice(0, maxLength) + "...";
}

function forceBreakNewlines(text: string) {
	return text.replace(/\n/g, "  \n");
}

function transformMentions(text: string) {
	const mentionRegex = /@([a-zA-Z0-9_\-]+)/g;
	const mentionReplacer = (match: string, handle: string) => {
		return `<at-mention handle="${handle}">${match}</at-mention>`;
	};
	return text.replace(mentionRegex, mentionReplacer);
}

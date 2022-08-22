import { PropsWithChildren, useMemo, useState } from "react";
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
import { useCharacterHandleExists } from "@/utils/apis/indexer";

export function MarkdownRenderer({
	children,
	collapsible = false,
	displayMode = "normal",
	...props
}: PropsWithChildren<
	{
		collapsible?: boolean;
		displayMode?: "normal" | "main";
	} & ReactMarkdownOptions
>) {
	const { ref, width, height } = useElementSize();

	const isExceeded = height > 500;

	const [collapsed, setCollapsed] = useState(collapsible);

	const fontSize = displayMode === "main" ? 17 : 15;

	const Memoed = useMemo(() => {
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
											size={fontSize}
											className="leading-1.25em my-2 break-words"
											style={{ wordBreak: "break-word" }}
											{...props}
										/>
									);
								},
								img: function MarkdownImg({ node, ...props }) {
									const src = ipfsLinkToHttpLink(props.src!);
									// const [paddingTop, setPaddingTop] = useState<string>("0");

									return (
										<div
											className="relative my-2 w-full"
											style={{
												height: props.height ?? 300,
												width: props.width,
												// paddingTop,
											}}
										>
											<Image
												className="cursor-pointer rounded-md object-contain"
												alt={props.alt}
												title={props.title}
												fill
												sizes="(min-width: 75em) 33vw, (min-width: 48em) 50vw, 100vw"
												src={src}
												onClick={(e) => {
													e.stopPropagation();
													window.open(src);
												}}
												// onLoadingComplete={(e) => {
												// 	if (paddingTop === "0") {
												// 		const { naturalWidth, naturalHeight } = e;
												// 		setPaddingTop(
												// 			`calc(100% / (${naturalWidth} / ${naturalHeight}))`
												// 		);
												// 		console.log({ paddingTop });
												// 	}
												// }}
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
											size={fontSize}
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
									return (
										<Code block className="overflow-auto">
											{props.children}
										</Code>
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
								"at-mention": function AtMention({ node, ...props }) {
									const { data, isLoading } = useCharacterHandleExists(
										props.handle
									);
									const noHandle = !isLoading && !data;
									return isLoading || noHandle ? (
										<span>@{props.handle}</span>
									) : (
										<CharacterHandle handle={props.handle} />
									);
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
	}, [children, collapsible, props]);

	return Memoed;
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
	const mentionRegex = /@([a-zA-Z0-9_\-]+)\s/g;
	const mentionReplacer = (match: string, handle: string) => {
		return `<at-mention handle="${handle}">${match}</at-mention>`;
	};
	return text.replace(mentionRegex, mentionReplacer);
}

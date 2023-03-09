import type { getLinkPreview } from "link-preview-js";
import { Skeleton, Space, Text } from "@mantine/core";
import { Image } from "~/shared/components/image";

interface LinkPreviewCardProps {
	data: Awaited<ReturnType<typeof getLinkPreview>>;
}

const LinkPreviewCard = ({ data }: LinkPreviewCardProps) => (
	<a
		href={data.url}
		target="_blank"
		rel="noreferrer"
		onClick={(e) => e.stopPropagation()}
	>
		<div className="flex flex-row my-4 p-4 border-solid border-1px border-#CCC rounded gap-4 bg-hover">
			{"images" in data && data.images[0] && (
				<div className="relative w-100px h-100px rounded-xl flex-shrink-0 overflow-hidden">
					<Image
						className="flex rounded-xl aspect-ratio-1 object-cover"
						width={100}
						height={100}
						sizes="100px"
						src={data.images[0]}
						alt={data.title}
					/>
				</div>
			)}
			<div className="flex flex-col flex-grow">
				<div className="flex flex-row items-center">
					{"favicons" in data && data.favicons[0] && (
						<div className="flex">
							<div className="relative w-16px h-16px overflow-hidden">
								<Image
									width={16}
									height={16}
									sizes="16px"
									src={data.favicons[0]}
									alt="favicon"
									className="object-cover vertical-super"
									placeholder={undefined}
								/>
							</div>
							<Space w={5} />
						</div>
					)}
					{"title" in data && (
						<div>
							<Text color="dark" size="lg" lineClamp={1}>
								{data.siteName || data.title}
							</Text>
						</div>
					)}
				</div>
				<Space h={5} />
				{"description" in data && (
					<Text color="gray" size="xs" lineClamp={3}>
						{data.description}
					</Text>
				)}
			</div>
		</div>
	</a>
);

export const LinkPreviewSkeleton = () => (
	<div className="flex flex-row my-4 p-4 border-solid border-1px border-#CCC rounded gap-4">
		<div className="flex w-20 h-20 rounded-xl flex-shrink-0">
			<Skeleton height={80} width={80} className="rounded-xl" />
		</div>
		<div className="flex flex-col flex-grow">
			<div className="flex flex-row gap-2 items-center">
				<Skeleton circle height={20} width={20} />
				<Skeleton height={16} />
			</div>
			<div className="flex flex-col">
				<Skeleton height={12} mt={8} />
				<Skeleton height={12} mt={4} />
				<Skeleton height={12} mt={4} />
			</div>
		</div>
	</div>
);

export default LinkPreviewCard;

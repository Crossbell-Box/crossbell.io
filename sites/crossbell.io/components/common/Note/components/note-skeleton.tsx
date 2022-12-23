import { Skeleton, Space, Text } from "@mantine/core";

export function NoteSkeleton() {
	return (
		<div className="flex flex-row w-full py-3 px-3 border-b border-gray/20 bg-hover cursor-pointer">
			{/* avatar */}
			<div>
				<Skeleton height={48} circle />
			</div>

			<Space w={10} />

			{/* right side */}
			<div className="flex-grow">
				{/* username */}
				<div className="flex items-baseline">
					<Text weight="bolder">
						<Skeleton height="1em" radius="xl" />
					</Text>

					<Space w={3} />

					<Text color="dimmed" size="sm">
						<Skeleton height="1em" radius="xl" width={50} />
					</Text>

					<Text color="dimmed" size="sm">
						<Skeleton height="1em" radius="xl" width={50} />
					</Text>
				</div>

				{/* content */}
				<div>
					<Skeleton height="1em" radius="xl" my={5} />
					<Skeleton height="1em" radius="xl" my={5} />
					<Skeleton height="1em" radius="xl" my={5} />
				</div>

				<Space h={10} />

				{/* actions */}
				<div className="flex items-center justify-between">
					{/* comment */}

					{/* used for ui placeholder */}
					<div className="flex items-center"></div>
				</div>
			</div>
		</div>
	);
}

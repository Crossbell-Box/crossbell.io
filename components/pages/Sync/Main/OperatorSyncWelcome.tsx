import { useCurrentCharacter } from "@/utils/apis/indexer";
import { useActivateCharacter } from "@/utils/apis/operator-sync";
import { Button, Text } from "@mantine/core";

export default function OperatorSyncWelcome() {
	const { data: character } = useCurrentCharacter();
	const activate = useActivateCharacter(character?.characterId);

	return (
		<div>
			<SNSIcons />
			<div className="flex flex-col items-center text-center pt-40 pb-12">
				{/* title */}
				<Text className="font-deca font-bold text-4xl text-[#2768E3]">
					Don&apos;t Post for{" "}
					<Text
						className="font-deca inline"
						variant="gradient"
						gradient={{ from: "gray.8", to: "gray.5" }}
					>
						Them
					</Text>
				</Text>
				<Text className="font-deca font-bold text-4xl text-[#2768E3]">
					Post for{" "}
					<Text
						className="font-deca inline"
						variant="gradient"
						gradient={{ from: "brand.8", to: "brand.5" }}
					>
						Yourself
					</Text>
				</Text>

				<Text className="text-lg text-[#082135] block px-10 sm:px-5">
					Crossbell Sync helps you sync all your Web2 social media onto the
					Crossbell chain that{" "}
					<Text className="inline underline-dotted underline">
						belongs to Y<Text className="text-red inline">♥</Text>
						U.
					</Text>
				</Text>

				<div className="mt-8">
					<Button
						color="blue"
						size="md"
						onClick={() => activate.mutate()}
						loading={activate.isLoading}
					>
						<Text className="text-lg font-medium">Get Started</Text>
					</Button>
				</div>
			</div>
		</div>
	);
}

function SNSIcons() {
	return (
		<div className="absolute w-full h-full overflow-hidden">
			<img
				src="/logos/twitter.png"
				alt="Twitter Icon"
				className="absolute left-0 top-0"
				style={{
					width: "250.7px",
					height: "250.7px",
					left: "-80px",
					top: "-26px",
					transform: "rotate(15deg)",
				}}
			/>
			<img
				src="/logos/instagram.png"
				alt="Instagram Icon"
				className="absolute right-0 top-0"
				style={{
					width: "128px",
					height: "128px",
					right: "-20px",
					top: "65px",
					transform: "matrix(-0.97, 0.26, 0.26, 0.97, 0, 0)",
				}}
			/>
			<img
				src="/logos/youtube.png"
				alt="Youtube Icon"
				className="absolute left-0 bottom-0"
				style={{
					width: "95.95px",
					height: "95.95px",
					left: "-12px",
					bottom: "-8px",
					transform: "rotate(-30deg)",
				}}
			/>
			<img
				src="/logos/tiktok.png"
				alt="Tiktok Icon"
				className="absolute right-0 bottom-0"
				style={{
					width: "168.28px",
					height: "168.28px",
					right: "-30px",
					bottom: "-16px",
					transform: "matrix(-0.93, -0.36, -0.36, 0.93, 0, 0)",
				}}
			/>
		</div>
	);
}

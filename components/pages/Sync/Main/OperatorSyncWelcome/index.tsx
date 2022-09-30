import { Button, Text } from "@mantine/core";

import { useCurrentCharacter } from "@/utils/apis/indexer";
import { useActivateCharacter } from "@/utils/apis/operator-sync";
import { useLoginChecker } from "@/utils/wallet/hooks";

import { SNSIcons } from "./sns-icons";

export default function OperatorSyncWelcome() {
	const { data: character } = useCurrentCharacter();
	const activate = useActivateCharacter(character?.characterId);

	const { validate } = useLoginChecker();

	const handleStart = () => {
		// check login status
		if (validate()) {
			activate.mutate();
		}
	};

	return (
		<div className="relative z-0">
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

				<div className="my-8">
					<Button
						color="blue"
						size="md"
						onClick={() => handleStart()}
						loading={activate.isLoading}
					>
						<Text className="text-lg font-medium">Get Started</Text>
					</Button>
				</div>
			</div>
		</div>
	);
}

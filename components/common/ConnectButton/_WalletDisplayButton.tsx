import { useCurrentCharacter } from "@/utils/apis/indexer";
import { truncateAddress } from "@/utils/ethers";
import { Text, Space, type ButtonProps, Group } from "@mantine/core";
import { forwardRef } from "react";
import { useAccount, useBalance } from "wagmi";
import Avatar from "@/components/common/Avatar";
import BaseButton from "./_BaseButton";
import { extractCharacterName } from "@/utils/metadata";
import ArrowIcon from "./arrow-icon.svg";
import Logo from "@/components/common/Logo";
import Image from "../Image";
import classNames from "classnames";

type WalletDisplayButtonProps = ButtonProps & { menuOpened: boolean };
const WalletDisplayButton = forwardRef<
	HTMLButtonElement,
	WalletDisplayButtonProps
>(({ menuOpened, ...props }, ref) => {
	const { address } = useAccount();
	const { isLoading, data: character } = useCurrentCharacter();

	const { data: balance } = useBalance({ addressOrName: address });

	return (
		<BaseButton
			ref={ref}
			{...props}
			className="overflow-hidden"
			styles={{
				root: {
					background:
						"linear-gradient(97.73deg, #4172DE -39.7%, #5B89F7 94.74%);",
				},
			}}
		>
			{isLoading ? (
				<Text>Loading...</Text>
			) : (
				<div className="flex flex-col justify-between">
					{/* addr and csb */}
					<div className="flex flex-row justify-between items-center">
						{/* addr */}
						<Text size="xs" className="font-400 leading-1em text-[#C1CFF0]">
							{truncateAddress(address)}
						</Text>

						<Space w={5} />

						{/* csb */}
						<div className="flex flex-row items-center">
							<Logo size={12} />
							<Space w={2} />
							<Text size="xs" className="font-400 text-[#F2F2F2]">
								{balance?.formatted}
							</Text>
						</div>
					</div>

					<Space h={5} />

					<div className="flex flex-row justify-between items-center">
						<Group spacing="xs">
							{/* avatar */}
							<Avatar character={character} className="border-white border-2" />

							<div className="z-1 flex flex-col justify-between">
								{/* name */}
								{/* <Text
									className="font-500 leading-1em overflow-hidden text-ellipsis max-w-8em"
									color="light"
								>
									{extractCharacterName(character)}
								</Text> */}

								{/* handle */}
								<Text className="font-500 leading-1em overflow-hidden text-ellipsis max-w-8em text-[#F2F2F2]">
									{character?.handle ? "@" + character.handle : ""}
								</Text>
							</div>
						</Group>

						{/* arrow icon */}
						<Image
							src={ArrowIcon}
							width={24}
							height={24}
							className={classNames("transition-transform-500", {
								"rotate-90": menuOpened,
							})}
						/>
					</div>
				</div>
			)}
		</BaseButton>
	);
});
WalletDisplayButton.displayName = "WalletDisplayButton";

export default WalletDisplayButton;

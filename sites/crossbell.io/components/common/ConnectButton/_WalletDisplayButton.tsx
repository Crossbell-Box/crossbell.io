import { Text, Space, type ButtonProps, Group, Indicator } from "@mantine/core";
import { forwardRef } from "react";
import classNames from "classnames";

import { Avatar } from "~/shared/components/avatar";
import Logo from "@/components/common/Logo";
import { truncateAddress } from "@crossbell/util-ethers";

import { ConnectButtonProps } from "./index";
import BaseButton from "./_BaseButton";
import { Image } from "~/shared/components/image";
import ArrowIcon from "./arrow-icon.svg";

import {
	GeneralAccount,
	OpSignIcon,
	useAccountBalance,
	useAccountCharacter,
} from "@crossbell/connect-kit";
import { useNotifications } from "@crossbell/notification";
import { extractCharacterName } from "@crossbell/util-metadata";

type WalletDisplayButtonProps = ButtonProps & {
	menuOpened: boolean;
	mode: ConnectButtonProps["mode"];
	account: GeneralAccount;
};

const WalletDisplayButton = forwardRef<
	HTMLButtonElement,
	WalletDisplayButtonProps
>(({ menuOpened, mode, account, ...props }, ref) => {
	const character = useAccountCharacter();
	const { isAllRead } = useNotifications();

	const { balance, isLoading: isLoadingBalance } = useAccountBalance();

	const isLoading = isLoadingBalance;
	const addressDisplay = truncateAddress(
		account.type === "email" ? account.email : account.address
	);

	if (mode === "minimal") {
		return (
			<BaseButton
				mode={mode}
				ref={ref}
				{...props}
				variant="outline"
				color="dark"
				styles={{
					root: {
						borderColor: "#D1D9F0",
					},
				}}
			>
				{isLoading ? (
					<Text>Loading...</Text>
				) : (
					<Group spacing="sm">
						<Text className="font-600" size="sm">
							{addressDisplay}
						</Text>

						<Avatar character={character} size={28} />
					</Group>
				)}
			</BaseButton>
		);
	}

	return (
		<BaseButton
			mode={mode}
			ref={ref}
			{...props}
			classNames={{
				label: "w-full",
			}}
			styles={{
				root: {
					background:
						"linear-gradient(97.66deg, #4172DE -4.94%, #5B89F7 105.67%)",
				},
			}}
		>
			{isLoading ? (
				<div className="flex flex-col justify-between items-center w-full">
					<Text>Loading...</Text>
				</div>
			) : (
				<div className="flex flex-col justify-between w-full pt-10px pb-16px">
					{/* addr and csb */}
					<div className="flex flex-row justify-between items-center">
						{/* addr */}
						<Text size="xs" className="font-400 leading-1em text-[#C1CFF0]">
							{addressDisplay}
						</Text>

						<Space w={5} />

						{/* csb */}
						<div className="flex flex-row items-center">
							<Logo size={17} />
							<Space w={4} />
							<Text
								size="sm"
								className="leading-1.5rem font-400 text-[#F2F2F2]"
							>
								{balance?.formatted ?? "0.00"}
							</Text>
						</div>
					</div>

					<Space h={4} />

					<div className="flex flex-row justify-between items-center">
						<Group spacing={4}>
							{/* avatar */}
							<Avatar
								character={character}
								size={40}
								className="border-white border-2"
							/>

							<div className="z-1 flex flex-col justify-between">
								{/* handle */}
								<span className="font-500 leading-24px text-15px truncate max-w-8em text-[#F2F2F2]">
									{extractCharacterName(character)}
								</span>

								{account.type === "wallet" && (
									<OpSignIcon
										openSettingsOnClick={true}
										className="bg-[#FFFFFF]/80 p-1px rounded-2px text-12px"
										characterId={character?.characterId}
									/>
								)}
							</div>
						</Group>

						{/* arrow icon */}
						<Indicator color="red" size={6} offset={5} disabled={isAllRead}>
							<Image
								src={ArrowIcon}
								width={24}
								height={24}
								className={classNames("transition-transform-150 m-4px", {
									"rotate-90": menuOpened,
								})}
								placeholder="empty"
							/>
						</Indicator>
					</div>
				</div>
			)}
		</BaseButton>
	);
});
WalletDisplayButton.displayName = "WalletDisplayButton";

export default WalletDisplayButton;

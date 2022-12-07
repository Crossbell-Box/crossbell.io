import { Text, Space, type ButtonProps, Group } from "@mantine/core";
import { forwardRef } from "react";
import classNames from "classnames";

import Avatar from "@/components/common/Avatar";
import Logo from "@/components/common/Logo";
import { truncateAddress } from "@crossbell/util-ethers";

import { ConnectButtonProps } from "./index";
import BaseButton from "./_BaseButton";
import Image from "../Image";
import ArrowIcon from "./arrow-icon.svg";

import {
	GeneralAccount,
	useAccountBalance,
	useAccountCharacter,
} from "@/components/connectkit";

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
						"linear-gradient(97.73deg, #4172DE -39.7%, #5B89F7 94.74%);",
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
								{balance ?? "0.00"}
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
								<Text
									size="md"
									className="font-500 leading-1.5rem overflow-hidden text-ellipsis max-w-8em text-[#F2F2F2]"
								>
									{character?.handle ? "@" + character.handle : ""}
								</Text>
							</div>
						</Group>

						{/* arrow icon */}
						<Image
							src={ArrowIcon}
							width={24}
							height={24}
							className={classNames("transition-transform-150 m-4px", {
								"rotate-90": menuOpened,
							})}
							placeholder="empty"
						/>
					</div>
				</div>
			)}
		</BaseButton>
	);
});
WalletDisplayButton.displayName = "WalletDisplayButton";

export default WalletDisplayButton;

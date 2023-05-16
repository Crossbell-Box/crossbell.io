import React from "react";
import classNames from "classnames";
import Image from "next/image";
import { useMediaQuery } from "@mantine/hooks";
import {
	DumbOpSignIcon,
	useToggleOpSignOperator,
	useIsWalletSignedIn,
	useWalletSignIn,
	useIsOpSignEnabled,
	useConnectedAccount,
	useConnectModal,
	useUpgradeEmailAccountModal,
} from "@crossbell/connect-kit";
import { Toggle, LoadingOverlay } from "@crossbell/ui";
import { useRefCallback } from "@crossbell/util-hooks";
import { useScrollState } from "scrollex";
import { clamp } from "framer-motion";

import { breakpoints } from "~/scripts/unocss/breakpoints";

import { Star } from "@/components/pages/landing-page/components/star";
import transactionUrl from "./transaction.png";
import transactionPCUrl from "./transaction-pc.png";
import opSignCardUrl from "./op-sign-card-bg.png";
import styles from "./index.module.css";
import { AutoShow } from "@/components/pages/landing-page/components/auto-show";

export function OperatorSignSection() {
	return (
		<div className="pb-[30vh] h-[200vh] md:h-unset">
			<AutoShow>
				<h4 className="font-deca flex items-center justify-center gap-[4px] text-[20px] md:text-[24px] font-light mt-0 mb-[8px]">
					<Star />
					Operator Sign
					<span className="hidden md:inline">, Operator Smoothly</span>
				</h4>
			</AutoShow>

			<AutoShow>
				<p className="text-[24px] md:text-[64px] max-w-[342px] md:max-w-[95vw] text-center mx-auto font-deca m-0">
					Make Metamask popups a thing of the past
				</p>
			</AutoShow>

			<AutoShow className="mt-[42px] md:mt-[84px] sticky top-[10vh]">
				<Cards />
			</AutoShow>
		</div>
	);
}

const activeSizeMap = {
	mobile: 292,
	pc: 441,
};

const inactiveSizeMap = {
	mobile: 10,
	pc: 30,
};

const gapSizeMap = {
	mobile: 8,
	pc: 16,
};

const totalCardsCount = 19;
const opSignCardIndex = 11;

function Cards() {
	const list = Array.from({ length: totalCardsCount });
	const ref = React.useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = React.useState(0);
	const isMD = useMediaQuery(`(min-width: ${breakpoints.md}px)`);
	const activeSize = isMD ? activeSizeMap.pc : activeSizeMap.mobile;
	const inactiveSize = isMD ? inactiveSizeMap.pc : inactiveSizeMap.mobile;
	const gapSize = isMD ? gapSizeMap.pc : gapSizeMap.mobile;
	const toggle = useToggle();
	const isOPSignCardActive = activeIndex === opSignCardIndex;
	const scrollIndex = useScrollState(({ position, section, container }) => {
		const sectionPosition = position - section.topAt("container-top");
		const sectionScrollableHeight = section.height - container.height;
		const progress = sectionPosition / sectionScrollableHeight;
		return Math.round(clamp(0, 1, progress) * totalCardsCount);
	});

	React.useEffect(() => {
		if (!isMD) {
			setActiveIndex(Math.min(scrollIndex ?? 0, opSignCardIndex));
		}
	}, [isMD, scrollIndex]);

	return (
		<div
			className={classNames(
				"relative md:w-fit mx-auto",
				isMD ? "h-[600px]" : "w-[200px]"
			)}
			style={{
				[isMD ? "width" : "height"]:
					(list.length - 1) * inactiveSize +
					activeSize +
					(list.length - 1) * gapSize,
			}}
			ref={ref}
		>
			{list.map((_, index) => {
				const isActive = activeIndex === index;
				const gapOffset = index * gapSize;
				const cardOffset =
					(index - 1) * inactiveSize +
					(index > activeIndex ? activeSize : inactiveSize);
				const offset = cardOffset + gapOffset;
				const isOPSignCard = index === opSignCardIndex;

				return (
					<div
						key={index}
						className={classNames(
							"w-full rounded-[6px] md:rounded-[12px] absolute transition-all transition-duration-400 overflow-hidden",
							isOPSignCardActive && !isOPSignCard && "opacity-50"
						)}
						style={{
							[isMD ? "top" : "left"]: 0,
							[isMD ? "left" : "top"]: offset,
							[isMD ? "height" : "width"]: "100%",
							[isMD ? "width" : "height"]: isActive ? activeSize : inactiveSize,
							zIndex: list.length - index,
						}}
						onPointerEnter={() => {
							if (!toggle.isLoading) {
								setActiveIndex(index);
							}
						}}
					>
						<div
							className="relative"
							style={{
								[isMD ? "height" : "width"]: "100%",
								[isMD ? "width" : "height"]: activeSize,
							}}
						>
							{isOPSignCard ? (
								<OPSignCard {...toggle} />
							) : (
								<Image
									src={isMD ? transactionPCUrl : transactionUrl}
									alt="Transaction"
									fill
								/>
							)}

							<div
								className={classNames(
									"absolute inset-0 transition pointer-events-none",
									isOPSignCard ? "bg-[#9688F2] z-10" : "bg-[#fff] -z-10",
									isActive ? "opacity-0" : "opacity-100"
								)}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
}

function OPSignCard({
	isOpSignEnabled,
	isLoading,
	handleToggle,
}: ReturnType<typeof useToggle>) {
	return (
		<>
			<div className="relative w-full h-full z-0 overflow-hidden rounded-[24px]">
				<LoadingOverlay visible={isLoading} />

				<Image
					src={opSignCardUrl}
					alt="OP Sign Background"
					fill
					className="object-fit -z-10"
				/>

				<div>
					<h3 className="text-center my-[16px] text-[14px] md:mt-[28px] md:text-[16px] md:mb-[26px]">
						Settings
					</h3>
					<p className="text-[12px] px-[16px] md:text-[14px] md:leading-[20px] max-w-[312px] text-center mx-auto my-0">
						By signing the
						<DumbOpSignIcon
							className="text-[16px] md:text-[24px] align-middle mx-1"
							isActive={true}
						/>
						, you can interact without clicking to agree the smart contracts
						every time. We are in Beta, and new users who try it out will be
						rewarded with 0.01 $CSB.
					</p>

					<div className="flex items-center gap-[8px] max-w-[363px] px-[20px] mx-auto mt-[22px]">
						<DumbOpSignIcon
							className="text-[16px] md:text-[24px]"
							isActive={true}
						/>
						<span className="text-[12px] md:text-[16px] font-500">
							Operator Sign
						</span>

						<Toggle
							isActive={isOpSignEnabled}
							onToggle={handleToggle}
							className={styles.toggle}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

function useToggle() {
	const account = useConnectedAccount();
	const connectModal = useConnectModal();
	const upgradeEmailAccountModal = useUpgradeEmailAccountModal();
	const autoActivateOperatorRef = React.useRef(false);

	const [{ toggleOperator, hasPermissions }, { isLoading: isToggling }] =
		useToggleOpSignOperator({ characterId: account?.characterId });
	const walletSignIn = useWalletSignIn();
	const isLoading = walletSignIn.isLoading || isToggling;

	const isWalletSignedIn = useIsWalletSignedIn();
	const isOpSignEnabled = useIsOpSignEnabled(account);

	React.useEffect(() => {
		if (
			autoActivateOperatorRef.current &&
			isWalletSignedIn &&
			!hasPermissions &&
			!isToggling
		) {
			toggleOperator();
			autoActivateOperatorRef.current = false;
		}
	}, [isWalletSignedIn, hasPermissions, toggleOperator, isToggling]);

	const handleToggle = useRefCallback(() => {
		if (account) {
			if (account.type === "wallet") {
				if (isOpSignEnabled || isWalletSignedIn) {
					toggleOperator();
				} else {
					autoActivateOperatorRef.current = true;
					walletSignIn.mutate();
				}
			} else {
				upgradeEmailAccountModal.show();
			}
		} else {
			connectModal.show();
		}
	});

	return { handleToggle, isOpSignEnabled, isLoading };
}

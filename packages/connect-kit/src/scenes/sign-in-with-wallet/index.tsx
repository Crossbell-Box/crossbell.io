import React from "react";

import {
	SignInWithWallet as Main,
	SignInWithWalletProps as Props,
	ModalHeaderProps,
	DynamicScenesHeader,
	DynamicScenesContainer,
} from "../../components";

export type SignInWithWalletProps = Props & {
	canGoBack?: boolean;
	Header?: React.ComponentType<ModalHeaderProps>;
};

export function SignInWithWallet({
	Header: Header_,
	canGoBack,
	...props
}: SignInWithWalletProps) {
	const Header = Header_ ?? DynamicScenesHeader;

	return (
		<DynamicScenesContainer
			padding="8px 24px 18px"
			header={
				<Header
					leftNode={canGoBack ? undefined : false}
					title="Sign In with Wallet"
				/>
			}
		>
			<Main {...props} />
		</DynamicScenesContainer>
	);
}

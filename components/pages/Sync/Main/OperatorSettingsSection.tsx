import LoadingOverlay from "@/components/common/LoadingOverlay";
import Tooltip from "@/components/common/Tooltip";
import { useSetCharacterOperator } from "@/utils/apis/contract";
import {
	useCharacterOperator,
	useCurrentCharacter,
} from "@/utils/apis/indexer";
import { OPERATOR_ADDRESS } from "@/utils/apis/operator-sync";
import { isAddressEqual } from "@/utils/ethers";
import { Alert, Button, Code, Space, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import BaseSection from "./BaseSection";

export default function OperatorSettingsSection() {
	const { data: character } = useCurrentCharacter();
	const { data: operator, isLoading: isLoadingOperator } = useCharacterOperator(
		character?.characterId
	);
	const hasOperator = isAddressEqual(operator, OPERATOR_ADDRESS);

	const setOperator = useSetCharacterOperator(
		character?.characterId!,
		OPERATOR_ADDRESS
	);

	return (
		<div>
			{isLoadingOperator ? (
				<div className="relative min-h-100px">
					<LoadingOverlay visible></LoadingOverlay>
				</div>
			) : hasOperator ? (
				<></>
			) : (
				<BaseSection title="Operator">
					<Alert title="Authorize the Operator to Sync" color="blue">
						<Text>
							<Tooltip
								label="an authorized address to delegate your operations"
								helpText
							>
								Operator
							</Tooltip>{" "}
							is not authorized. Please authorize the operator to sync.
						</Text>
						<Text>
							Your current operator address:
							<Code>{operator ?? "(no operator yet)"}</Code>
						</Text>
						<Text>
							Our operator address for the Sync:
							<Code>{OPERATOR_ADDRESS}</Code>
						</Text>

						<Space h={5} />
						<Button
							color="blue"
							className="my-5"
							onClick={() => {
								setOperator.mutate(undefined, {
									onSuccess: () => {
										showNotification({
											message: "Successfully authorized the operator",
											color: "green",
										});
									},
								});
							}}
							loading={setOperator.isLoading}
						>
							Set Operator
						</Button>
					</Alert>
				</BaseSection>
			)}
		</div>
	);
}

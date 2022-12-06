import React from "react";

import { useCharacterOperators } from "./use-character-operators";

export function useCharacterHasOperator(operator: string) {
	const operators = useCharacterOperators();
	const hasOperator = React.useMemo(
		() =>
			operators.findIndex((o) => o.toUpperCase() === operator.toUpperCase()) >=
			0,
		[operators, operator]
	);

	return hasOperator;
}

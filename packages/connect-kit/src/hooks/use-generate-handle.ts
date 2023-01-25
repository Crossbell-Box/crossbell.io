import React from "react";
import { generateHandleFromName } from "~/shared/character/generate-handle-from-name";
import { useDisclosure, useDebounce } from "@crossbell/util-hooks";
import { useCharacterByHandle } from "@crossbell/indexer";

export function useGenerateHandle(name_: string) {
	const name = useDebounce(name_, 500);
	const [refreshKey, { toggle: refreshHandle }] = useDisclosure(false);
	const handle = React.useMemo(
		() => name && generateHandleFromName(name),
		[name, refreshKey]
	);
	const { isLoading, data } = useCharacterByHandle(handle);

	React.useEffect(() => {
		if (isLoading && data) {
			refreshHandle();
		}
	}, [isLoading, data]);

	return isLoading || name !== name_ ? null : handle;
}

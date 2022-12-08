import React from "react";
import { composeSearchHref, useSearchRouterQuery } from "~/shared/url";
import {
	createPolymorphicComponent,
	Text,
	TextInput,
	TextInputProps,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { useRouter } from "next/router";

type SearchInputProps = {
	initialValue?: string;
} & TextInputProps;
function SearchInput_({ initialValue, ...props }: SearchInputProps) {
	const [value, setValue] = useInputState(initialValue ?? "");
	const router = useRouter();
	const { type } = useSearchRouterQuery();

	return (
		<TextInput
			type="text"
			icon={<Text className="i-csb:search" />}
			placeholder="Search"
			classNames={{
				root: "w-full",
				wrapper: "text-[#687792]",
				input:
					"rounded-12px border-[#E1E8F7] focus:border-[#687792] font-500 transition-border-color",
			}}
			size="md"
			autoComplete="off"
			autoCapitalize="sentences"
			autoCorrect="off"
			spellCheck="false"
			enterKeyHint="search"
			value={value}
			onChange={(e) => {
				setValue(e.target.value);
			}}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.keyCode === 13) {
					e.preventDefault();
					e.stopPropagation();
					router.push(composeSearchHref(value, type));
				}
			}}
			onFocus={(e) => {
				e.target.select();
				router.prefetch(composeSearchHref(value, type));
			}}
			{...props}
		/>
	);
}
const SearchInput = createPolymorphicComponent<"input", SearchInputProps>(
	SearchInput_
);

export default SearchInput;

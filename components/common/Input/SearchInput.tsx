import React from "react";
import { usePrimaryShade } from "@/components/providers/ThemeProvider";
import { composeSearchHref, useSearchRouterQuery } from "@/utils/url";
import {
	createPolymorphicComponent,
	Text,
	TextInput,
	TextInputProps,
	useMantineTheme,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { useRouter } from "next/router";

export function useSearchInput() {
	const [value, setValue] = useInputState("");
	const router = useRouter();
	const { type } = useSearchRouterQuery();

	return {
		value,

		onChange(e: React.ChangeEvent<HTMLInputElement>) {
			setValue(e.target.value);
		},

		onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
			if (e.key === "Enter" || e.keyCode === 13) {
				e.preventDefault();
				e.stopPropagation();
				router.push(composeSearchHref(value, type));
			}
		},

		onFocus() {
			router.prefetch(composeSearchHref(value, type));
		},
	};
}

function SearchInput_({ ...props }: TextInputProps) {
	const { primaryColor } = useMantineTheme();
	const primaryShade = usePrimaryShade();
	const inputProps = useSearchInput();

	return (
		<TextInput
			type="text"
			icon={<Text className="i-csb:search" />}
			placeholder="Search"
			classNames={{
				wrapper: "text-[#687792]",
				input: "rounded-12px border-[#E1E8F7] focus:border-[#687792]",
			}}
			className="w-full"
			autoComplete="off"
			autoCapitalize="sentences"
			autoCorrect="off"
			spellCheck="false"
			enterKeyHint="search"
			{...inputProps}
			{...props}
		/>
	);
}
const SearchInput = createPolymorphicComponent<"input", TextInputProps>(
	SearchInput_
);

export default SearchInput;

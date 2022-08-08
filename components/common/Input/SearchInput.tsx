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

function SearchInput_({ ...props }: TextInputProps) {
	const { primaryColor } = useMantineTheme();
	const primaryShade = usePrimaryShade();
	const [value, setValue] = useInputState("");
	const router = useRouter();
	const { type } = useSearchRouterQuery();

	return (
		<TextInput
			type="text"
			icon={<Text className="i-csb:search" />}
			placeholder="Search"
			styles={{
				input: {
					borderColor: "transparent",
					":focus": { borderColor: primaryColor[primaryShade] },
				},
				wrapper: {
					boxShadow: "0px 0px 10px rgba(38, 108, 158, 0.1)",
				},
			}}
			className="w-full"
			autoComplete="off"
			autoCapitalize="sentences"
			autoCorrect="off"
			spellCheck="false"
			enterKeyHint="search"
			onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
				setValue(e.target.value)
			}
			onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
				if (e.key === "Enter" || e.keyCode === 13) {
					e.preventDefault();
					e.stopPropagation();
					router.push(composeSearchHref(value, type));
				}
			}}
			onFocus={() => {
				router.prefetch(composeSearchHref(value, type));
			}}
			{...props}
		/>
	);
}
const SearchInput = createPolymorphicComponent<"input", TextInputProps>(
	SearchInput_
);

export default SearchInput;

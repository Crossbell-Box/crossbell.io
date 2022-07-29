import { usePrimaryShade } from "@/components/providers/ThemeProvider";
import { Input, Text, useMantineTheme } from "@mantine/core";
import { useInputState } from "@mantine/hooks";

export default function SearchInput() {
	const { primaryColor } = useMantineTheme();
	const primaryShade = usePrimaryShade();
	const [value, setValue] = useInputState("");
	return (
		<Input
			type="text"
			icon={<Text className="i-csb:search" />}
			placeholder="Search"
			styles={{
				input: {
					borderColor: "transparent",
					":focus": { borderColor: primaryColor[primaryShade] },
				},
			}}
			style={{ boxShadow: "0px 0px 10px rgba(38, 108, 158, 0.1)" }}
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
					console.log(value);
				}
			}}
		/>
	);
}

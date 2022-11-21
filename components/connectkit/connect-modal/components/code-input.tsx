import React from "react";
import classNames from "classnames";

type InputStateParams = {
	size?: number;
	value: string;
	count: number;
	onValueChange: (code: string) => void;
};

export type CodeInputProps = React.HTMLAttributes<HTMLDivElement> &
	InputStateParams;

export function CodeInput({
	size,
	count,
	value,
	onValueChange,
	className,
	...props
}: CodeInputProps) {
	const state = useInputState({ count, value, onValueChange, size });

	return (
		<div
			{...props}
			className={classNames(className, "flex items-center justify-between")}
		>
			{state.list.map((value, index) => (
				<input
					key={index}
					style={{ width: `${size}px`, height: `${size}px` }}
					value={value}
					ref={state.refs[index]}
					onFocus={({ currentTarget }) => {
						if (state.list[index]) {
							currentTarget.select();
						} else {
							for (let i = count - 1; i >= 0; i--) {
								if (state.list[i]) {
									return state.focusOn(i + 1);
								}
							}

							return state.focusOn(0);
						}
					}}
					onSelect={({ currentTarget }) => currentTarget.select()}
					onKeyDown={({ key }) => {
						console.log(key);
						switch (key) {
							case "ArrowLeft":
								return state.focusOn(index - 1);
							case "ArrowRight":
								return state.focusOn(index + 1);
							case "Backspace":
						}
					}}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						state.onChange(event.currentTarget.value, index);
					}}
					className="selection:bg-transparent rounded-12px p-0 font-500 text-22px text-center leading-1 border-none bg-[#1C1B1F] bg-opacity-4 font-mono"
				/>
			))}
		</div>
	);
}

function useInputState({
	count,
	value: rawValue,
	onValueChange,
}: InputStateParams) {
	const refs = useRefs(count);

	return React.useMemo(() => {
		const list = Array.from({ length: count }).map((_, i) => rawValue[i] ?? "");

		return {
			list,
			refs,

			focusOn(index: number) {
				refs[(count + index) % count].current?.focus();
			},

			onChange(v: string, index: number) {
				const value = v.trim();
				const length = value.length;
				const nextIndex = index + (length > 0 ? length : -1);

				list.length = index;
				list.push(value);
				onValueChange(list.join("").substring(0, count));

				if (nextIndex < count) {
					this.focusOn(nextIndex);
				} else {
					refs[index].current?.blur();
					console.log("next!!");
				}
			},
		};
	}, [refs, count, onValueChange, rawValue]);
}

function useRefs(count: number) {
	return React.useMemo(() => {
		return Array.from({ length: count }).map(() => {
			return React.createRef<HTMLInputElement>();
		});
	}, [count]);
}

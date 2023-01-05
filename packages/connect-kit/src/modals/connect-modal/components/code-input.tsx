import React from "react";
import classNames from "classnames";

import styles from "./code-input.module.css";

type InputStateParams = {
	size?: number;
	value: string;
	count: number;
	onValueChange: (code: string) => void;
	onComplete: () => void;
};

export type CodeInputProps = React.HTMLAttributes<HTMLDivElement> &
	InputStateParams;

export function CodeInput({
	size,
	count,
	value,
	onValueChange,
	onComplete,
	className,
	...props
}: CodeInputProps) {
	const state = useInputState({
		count,
		value,
		onValueChange,
		size,
		onComplete,
	});

	return (
		<div {...props} className={classNames(className, styles.container)}>
			{state.list.map((value, index) => (
				<input
					key={index}
					style={{ width: `${size}px`, height: `${size}px` }}
					value={value}
					ref={state.refs[index]}
					onFocus={({ currentTarget }) => {
						currentTarget.select();
						state.moveFocusOn(index);
					}}
					onSelect={({ currentTarget }) => currentTarget.select()}
					onKeyDown={({ key }) => {
						switch (key) {
							case "ArrowLeft":
							case "Backspace":
								return state.moveFocusOn(index - 1);
							case "ArrowRight":
								return state.moveFocusOn(index + 1);
						}
					}}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						state.onChange(event.currentTarget.value, index);
					}}
					className={styles.input}
				/>
			))}
		</div>
	);
}

function useInputState({
	count,
	value: rawValue,
	onValueChange,
	onComplete,
}: InputStateParams) {
	const refs = useRefs(count);

	return React.useMemo(() => {
		const list = Array.from({ length: count }).map((_, i) => rawValue[i] ?? "");

		return {
			list,
			refs,

			moveFocusOn(index: number) {
				const nextIndex = (count + index) % count;
				const moveFocusOn = (i: number) => refs[i].current?.focus();
				const getValue = (i: number) => refs[i].current?.value ?? "";

				if (!!getValue(nextIndex)) {
					return moveFocusOn(nextIndex);
				} else {
					for (let i = count - 1; i >= 0; i--) {
						if (!!getValue(i)) {
							return moveFocusOn(i + 1);
						}
					}

					return moveFocusOn(0);
				}
			},

			onChange(v: string, index: number) {
				const value = v.trim();
				const length = value.length;
				const newList = list.slice(0, index);

				newList.push(value);
				onValueChange(newList.join("").substring(0, count));

				if (length > 0) {
					const nextIndex = index + length;

					if (nextIndex < count) {
						this.moveFocusOn(nextIndex);
					} else {
						onComplete();
					}
				}
			},
		};
	}, [refs, count, rawValue, onValueChange, onComplete]);
}

function useRefs(count: number) {
	return React.useMemo(() => {
		return Array.from({ length: count }).map(() => {
			return React.createRef<HTMLInputElement>();
		});
	}, [count]);
}

import BouncyBall from "./BouncyBall";

export default function ScrollBall({
	index,
	onClickNext,
}: {
	index: number;
	onClickNext: () => void;
}) {
	const colors = [
		undefined,
		"#5B89F7",
		"#F6C549",
		"#6AD991",
		"#9688F2",
		"#E65040",
	];
	const color = colors[index];

	return color ? (
		<div
			className="fixed bottom-50px left-50% translate-x--50% cursor-pointer z-10"
			onClick={() => {
				onClickNext?.();
			}}
		>
			<BouncyBall size={20} color={color} />
		</div>
	) : null;
}

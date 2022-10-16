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

	return (
		<div
			className="absolute bottom-50px left-50% translate-x--50% cursor-pointer"
			onClick={() => {
				onClickNext?.();
			}}
		>
			{color && <BouncyBall size={20} color={color} />}
		</div>
	);
}

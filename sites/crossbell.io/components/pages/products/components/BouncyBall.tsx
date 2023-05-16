import styles from "./BouncyBall.module.css";

export default function BouncyBall({
	color = "red",
	size = 100,
}: {
	color: string;
	size: number;
}) {
	return (
		<div style={{ height: size + 50 }}>
			<div
				className={styles.ball}
				style={{
					backgroundColor: color,
					width: size,
					height: size,
				}}
			></div>
		</div>
	);
}

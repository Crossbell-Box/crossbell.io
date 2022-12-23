type LogoProps = {
	size?: number;
};

export default function Logo({ size = 30 }: LogoProps) {
	return (
		<img
			style={{ width: size, height: size }}
			src="/images/logo.svg"
			alt="Crossbell Logo"
		/>
	);
}

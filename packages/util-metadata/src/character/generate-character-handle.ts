export function generateCharacterHandle(name: string) {
	const randomNumber = Math.floor(Math.random() * 10000);
	return (
		(name
			.trim()
			.slice(0, 25)
			.toLowerCase()
			.replace(/\s/g, "-")
			.replace(/[^a-z0-9-]/g, "") || "character") +
		"-" +
		randomNumber
	);
}

import { passwordStrength } from "check-password-strength";

export type Strength = 0 | 1 | 2 | 3;

export function checkStrength(password: string): Strength {
	return passwordStrength(password, [
		{ minDiversity: 0, minLength: 0, value: "Invalid Format", id: 0 },
		{ minDiversity: 1, minLength: 8, value: "Weak Password", id: 1 },
		{ minDiversity: 2, minLength: 8, value: "Moderate Password", id: 2 },
		{ minDiversity: 3, minLength: 12, value: "Strong Password", id: 3 },
	]).id as Strength;
}

export function isValidPasswordFormat(password: string) {
	return checkStrength(password) > 1;
}

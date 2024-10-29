export function validateEmail(email: string) {
	return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

export function checkDomain(domain: string) {
	return /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(domain);
}

export function validatePassword(password: string) {
	const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

	// Explanation:
	// ^               : Start of string
	// (?=.*[a-z])     : Ensure string has at least one lowercase letter
	// (?=.*[A-Z])     : Ensure string has at least one uppercase letter
	// (?=.*\d)        : Ensure string has at least one digit
	// (?=.*[@$!%*?&#]): Ensure string has at least one special character
	// [A-Za-z\d@$!%*?&#]{8,} : Ensure string is at least 8 characters long and contains allowed characters
	// $               : End of string

	return passwordRegex.test(password);
}

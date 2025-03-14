export const copyText = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text);
		alert('Text disalin ke clipboard');
	} catch (err) {
		console.error('Failed to copy text: ', err);
	}
};

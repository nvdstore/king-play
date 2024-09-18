export function slugify(text: string) {
	return text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^\w\-]+/g, '')
		.replace(/\-\-+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '');
}

export function currency(nominal: number) {
	if (Number.isNaN(nominal)) return '';

	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR'
	})
		.format(nominal)
		.replace(',00', '');
}

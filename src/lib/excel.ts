import * as XLSX from 'xlsx';

export function exportToFile(rows: unknown[], filename = 'export') {
	const worksheet = XLSX.utils.json_to_sheet(rows);
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, 'Dates');

	XLSX.writeFile(workbook, `${filename}.xlsx`, { compression: true });
}

export function xslsxBuffer(rows: unknown[], filename = 'export') {
	const worksheet = XLSX.utils.json_to_sheet(rows);
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, 'Dates');

	return XLSX.write(workbook, { type: 'buffer' });
}

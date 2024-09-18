export const themes = {
	dark: {
		main: 'bg-gradient-to-b from-slate-800 to-slate-900 text-neutral-50',
		nav: 'bg-gradient-to-b from-slate-700/75 to-slate-800/75 border-b border-slate-700 backdrop-blur-md',
		footer: 'border-t border-slate-700',
		bgColor: 'bg-slate-800',
		bgColorSecondary: 'bg-slate-700/50',
		color: 'text-neutral-50',
		border: 'border-slate-600',
		button: 'btn btn-slate',
		input:
			'px-2.5 h-10 bg-slate-700/50 border border-slate-600 focus:border-slate-600 rounded-lg outline-none text-sm',
		card: 'bg-slate-800 border border-slate-700 rounded-xl',
		cardButton: 'px-2.5 bg-slate-700/50 border border-slate-600 rounded-lg outline-none',
		cardButtonActive: 'px-2.5 bg-slate-700/75 rounded-lg outline-none transition-all'
	},
	light: {
		main: 'bg-neutral-50 text-slate-800',
		nav: 'bg-neutral-50/75 backdrop-blur-md',
		bgColor: 'bg-neutral-100',
		bgColorSecondary: 'bg-neutral-200',
		color: 'text-slate-800',
		border: 'border-neutral-300',
		button: 'btn btn-slate text-neutral-50',
		card: 'bg-neutral-100 border border-neutral-200 rounded-xl',
		cardButton: 'px-2.5 border border-neutral-300 rounded-lg outline-none text-sm',
		cardButtonActive: 'px-2.5 rounded-lg outline-none text-sm'
	}
};

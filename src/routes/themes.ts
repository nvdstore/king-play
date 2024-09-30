export const themes = {
	dark: {
		main: 'bg-gradient-to-b from-slate-800 to-slate-900 text-neutral-50',
		nav: 'bg-gradient-to-b from-slate-700/75 to-slate-800/75 border-b border-slate-700 backdrop-blur-md',
		footer: 'border-t border-slate-700',
		bgColor: 'bg-slate-800',
		bgColorSecondary: 'bg-slate-700/75',
		color: 'text-neutral-50',
		border: 'border-slate-600',
		button: 'btn btn-slate',
		input:
			'px-2.5 h-10 bg-slate-700/50 border border-slate-600 focus:border-slate-600 rounded-lg outline-none text-sm',
		card: 'bg-slate-800 border border-slate-700 rounded-xl',
		cardButton: 'bg-slate-700/50 border border-slate-600 rounded-lg outline-none',
		cardButtonActive: 'bg-slate-700/75 rounded-lg outline-none transition-all'
	},
	light: {
		main: 'bg-neutral-50 text-slate-800',
		nav: 'bg-neutral-100/75 border-b border-neutral-200 backdrop-blur-md',
		footer: 'border-t border-neutral-200',
		bgColor: 'bg-neutral-100',
		bgColorSecondary: 'bg-neutral-200',
		color: 'text-slate-800',
		border: 'border-neutral-300',
		button: 'btn btn-slate text-neutral-50',
		input:
			'px-2.5 h-10 bg-neutral-100/75 border border-neutral-300 focus:border-neutral-400 rounded-lg outline-none text-sm',
		card: 'bg-neutral-100/75 md:border border-neutral-200 rounded-xl',
		cardButton: 'border border-neutral-300 rounded-lg outline-none text-sm',
		cardButtonActive: 'rounded-lg border-neutral-800 outline-none text-sm'
	}
};

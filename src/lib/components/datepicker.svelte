<script lang="ts">
	import './datepicker.css';

	import { createEventDispatcher } from 'svelte';
	import { DatePicker } from '@svelte-plugins/datepicker';
	import { format } from 'date-fns';

	import TextInput from './text-input.svelte';

	const today = format(new Date(), 'yyyy-MM-dd');
	const dispatch = createEventDispatcher();

	export let startDate = today;
	export let endDate = today;
	export let dateFormat = 'MMM d, yyyy';
	export let isRange = false;
	export let isMultipane = false;
	export let label = '';

	let start = new Date(startDate).getTime();
	let end = new Date(endDate).getTime();
	let isOpen = false;
	let formattedStartDate = '';

	const toggleDatePicker = () => (isOpen = !isOpen);
	const formatDate = (date: number) => (date && format(new Date(date), dateFormat)) || '';

	function onClick() {
		if (start && end) {
			setTimeout(() => {
				dispatch('complete', { startDate, endDate });
			}, 100);
		}
	}

	$: formattedStartDate = formatDate(start);
	$: formattedEndDate = formatDate(end);
	$: {
		startDate = format(new Date(start), 'yyyy-MM-dd');
		endDate = format(new Date(end), 'yyyy-MM-dd');
	}
</script>

<DatePicker
	bind:isOpen
	bind:startDate={start}
	bind:endDate={end}
	{isRange}
	{isMultipane}
	theme="custom-datepicker"
	monthLabels={'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agu_Sep_Okt_Nov_Des'.split('_')}
	dowLabels={'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_')}
	onDayClick={onClick}
>
	<TextInput
		{label}
		value={isRange ? `${formattedStartDate} - ${formattedEndDate}` : formattedStartDate}
		readonly
		on:click={toggleDatePicker}
	/>
</DatePicker>

<style>
	:global(.datepicker[data-picker-theme='custom-datepicker']) {
		--datepicker-container-background: theme(colors.neutral.800);
		--datepicker-container-border: 1px solid theme(colors.neutral.700);
		--datepicker-container-border-radius: theme(borderRadius.lg);

		--datepicker-calendar-header-text-color: theme(colors.neutral.50);
		--datepicker-calendar-header-text-font-size: theme(fontSize.base);
		--datepicker-calendar-header-text-font-weight: theme(fontWeight.medium);
		--datepicker-calendar-dow-color: theme(colors.neutral.400);
		--datepicker-calendar-day-color: theme(colors.neutral.50);
		--datepicker-calendar-day-color-disabled: theme(colors.neutral.400);

		--datepicker-calendar-header-month-nav-background-hover: theme(colors.neutral.700);
		--datepicker-calendar-header-month-nav-icon-next-filter: invert(100);
		--datepicker-calendar-header-month-nav-icon-prev-filter: invert(100);
		--datepicker-calendar-header-year-nav-icon-next-filter: invert(100);
		--datepicker-calendar-header-year-nav-icon-prev-filter: invert(100);

		--datepicker-calendar-split-border: 1px solid theme(colors.neutral.700);

		--datepicker-calendar-range-background: theme(colors.neutral.50);
		--datepicker-calendar-range-background-disabled: theme(colors.neutral.50);
		--datepicker-calendar-range-selected-background: theme(colors.neutral.50);
		--datepicker-calendar-range-selected-color: theme(colors.neutral.700);
		--datepicker-calendar-range-color: theme(colors.neutral.700);
		--datepicker-calendar-range-color-disabled: #ffc0b7;
		--datepicker-calendar-range-cursor: default;
		--datepicker-calendar-range-font-weight: var(--datepicker-font-weight-base);
	}
</style>

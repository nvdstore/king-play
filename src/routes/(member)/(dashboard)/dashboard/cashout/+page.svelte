<script lang="ts">
	import { slide } from 'svelte/transition';
	import { toast } from '@zerodevx/svelte-toast';
	import { applyAction, enhance } from '$app/forms';

	import type { PaymentChannel } from '$lib/type';
	import { currency } from '$lib/utils/formatter';

	import type { ActionData, PageData } from './$types';
	import { invalidateAll } from '$app/navigation';

	export let data: PageData;
	export let form: ActionData;

	let selectedChannel: PaymentChannel;
	let loadingForm = false;
</script>

<section class="space-y-6">
	<header class="space-y-1" id="store">
		<h2 class="text-xl font-bold">Penarikan Dana</h2>
		<p class="text-sm">
			Gunakan fitur Penarikan Dana di Dashboard untuk menarik saldo Anda dengan mudah. Pilih metode
			penarikan yang diinginkan dan ikuti panduan cepat untuk menyelesaikan prosesnya.
		</p>
	</header>

	<div class="p-4 border border-neutral-700 rounded-md bg-neutral-800">
		<p class="text-sm">Saldo Anda</p>
		<p class="text-xl font-medium">{currency(data.balance)}</p>
	</div>

	<form
		method="post"
		use:enhance={() => {
			loadingForm = true;

			return async ({ result }) => {
				await applyAction(result);
				if (form?.message) {
					toast.push(form?.message);
				}
				invalidateAll();
				loadingForm = false;
			};
		}}
		class="space-y-4 p-4 border border-neutral-700 rounded-md bg-neutral-800"
	>
		<div class="input-group">
			<label for="nominal" class="input-label">Nominal Penarikan</label>
			<input
				type="number"
				name="nominal"
				class="input w-[250px] {form?.errors.nominal ? 'input-error' : ''}"
				placeholder="Masukkan nominal yang akan ditarik"
			/>
			{#if form?.errors.nominal}
				<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
					{form.errors.nominal}
				</p>
			{/if}
		</div>

		<div class="space-y-2">
			<p class="text-sm">Pilih Metode Penarikan</p>
			{#each data.channels as item}
				<p class="text-sm font-medium">{item.label}</p>
				<div class="space-y-1 space-x-2">
					{#each item.channels as channel}
						<button
							on:click={() => (selectedChannel = channel)}
							type="button"
							class="{selectedChannel == channel
								? 'border-red-500 bg-red-100'
								: ''} border bg-neutral-50 rounded-md"
						>
							<img src={channel.image} alt={channel.name} class="w-24 h-8 p-1 object-scale-down" />
						</button>
					{/each}
				</div>
			{/each}

			<input type="hidden" name="channel" value={selectedChannel?.id} />
		</div>

		<div class="flex flex-col space-y-4">
			<div class="input-group">
				<label for="idpel" class="input-label">Nomor Rekening</label>
				<input
					type="number"
					name="idpel"
					class="input w-[250px] {form?.errors.idpel ? 'input-error' : ''}"
					placeholder="Masukkan no. rekening atau no. telepon"
				/>
				{#if form?.errors.idpel}
					<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
						{form.errors.idpel}
					</p>
				{/if}
			</div>

			<div class="input-group">
				<label for="password" class="input-label">Kata Sandi</label>
				<input
					type="password"
					name="password"
					class="input w-[250px] {form?.errors.password ? 'input-error' : ''}"
					placeholder="Masukkan kata sandi Anda"
				/>
				{#if form?.errors.password}
					<p class="text-xs text-red-500" transition:slide={{ duration: 200 }}>
						{form.errors.password}
					</p>
				{/if}
			</div>
		</div>

		<div class="flex justify-end w-full border-t border-neutral-700 pt-4">
			<button type="submit" class="btn btn-red">Tarik Dana</button>
		</div>
	</form>
</section>

<script lang="ts">
	import type { Content } from '@prismicio/client';
	import IconFire from '~icons/mdi/fire';
	import clsx from 'clsx';
	export let slice: Content.WordListSlice;

	function getRandomInt(max: number) {
		return Math.floor(Math.random() * max);
	}
	let colors = ['text-primary-500', 'text-secondary-500', 'text-tertiary-500'];
</script>

<section
	data-slice-type={slice.slice_type}
	data-slice-variation={slice.variation}
	class=" absolute inset-0 -z-30 h-full overflow-hidden rounded bg-transparent transition-transform duration-300 ease-in-out"
>
	{#each slice.primary.word_list as { word }, index}
		<!-- Render content for item -->
		{#if index > 0}
			<div class="word-row mb-8 flex items-center justify-center gap-4 text-surface-500">
				{#each Array(15) as _, index}
					<span
						class={clsx(
							'word-itself text-8xl font-extrabold tracking-tighter',
							index === getRandomInt(15) + 2 ? colors[getRandomInt(3)] : 'text-surface-500'
						)}
					>
						{word}
					</span>
					<span class="text-3xl">
						<IconFire />
					</span>
				{/each}
			</div>
		{:else}
			<div class="word-row mb-8 flex items-center justify-center gap-4 text-surface-500">
				{#each Array(15) as _, index}
					<span
						class={clsx('word-itself text-8xl font-extrabold tracking-tighter text-surface-500')}
					>
						{word}
					</span>
					<span class="text-3xl">
						<IconFire />
					</span>
				{/each}
			</div>
		{/if}
	{/each}
</section>

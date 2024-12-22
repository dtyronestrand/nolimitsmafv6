<script lang="ts">
	import type { Content } from '@prismicio/client';
	import Bounded from '$lib/components/Bounded.svelte';
	import GoldText from '$lib/components/GoldText.svelte';

	import { PrismicRichText, PrismicImage, PrismicLink } from '@prismicio/svelte';
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	export let slice: Content.HeroSlice;

	onMount(() => {
		const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
		tl.fromTo('.hero__heading', { scale: 0.5 }, { scale: 1, opacity: 1, duration: 1.4 });
		tl.fromTo('.hero__body', { y: 20 }, { y: 0, opacity: 1, duration: 1.2 }, '-=0.6');
		tl.fromTo('.hero__button', { scale: 1.5 }, { scale: 1, opacity: 1, duration: 1.3 }, '-=0.8');
		tl.fromTo('.hero__image', { y: 100 }, { y: 0, opacity: 1, duration: 1.3 }, '+=0.3');
		tl.fromTo('.hero__glow', { scale: 0.5 }, { scale: 1, opacity: 1, duration: 1.8 }, '-=1');

		gsap.to('.hero__glow--one', {
			ease: 'power2.inOut',
			repeat: -1,
			repeatDelay: 0,
			keyframes: [
				{ top: '0%', left: '33%', duration: 0 },
				{ top: '33%', left: '33%', duration: 2 },
				{ top: '33%', left: '0%', duration: 3 },
				{ top: '0%', left: '0%', duration: 2 },
				{ top: '0%', left: '33%', duration: 3 }
			]
		});

		gsap.to('.hero__glow--two', {
			ease: 'power2.inOut',
			repeat: -1,
			repeatDelay: 0,
			keyframes: [
				{ top: '33%', left: '0%', duration: 0 },
				{ top: '0%', left: '0%', duration: 2 },
				{ top: '0%', left: '33%', duration: 3 },
				{ top: '33%', left: '33%', duration: 2 },
				{ top: '33%', left: '0%', duration: 3 }
			]
		});
	});
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="relative text-center">
		<h1
			class="hero__heading mx-auto max-w-3xl text-balance text-5xl font-medium opacity-0 md:text-7xl"
		>
			<PrismicRichText field={slice.primary.heading} components={{ em: GoldText }} />
		</h1>

		<div class="hero__image glass-container-logo mx-auto mt-16 w-1/2 opacity-0">
			<div
				class="hero__glow--one absolute left-1/3 top-0 -z-10 h-2/3 w-2/3 bg-yellow-400/50 mix-blend-screen blur-[120px] filter"
			/>
			<div
				class="hero__glow--two absolute left-0 top-1/3 -z-10 h-2/3 w-2/3 bg-orange-600/50 mix-blend-screen blur-[120px] filter"
			/>
			<PrismicImage class="rounded-[50%]" field={slice.primary.hero_image} />
		</div>

		<PrismicLink
			class="hero__button variant-ghost-primary btn btn-xl mt-20 text-4xl opacity-0"
			field={slice.primary.cta_link}>{slice.primary.cta_label}</PrismicLink
		>
	</div>
</Bounded>

<style>
	.glass-container-logo::before {
		@apply absolute -inset-[10px] -z-10 rounded-[50%] border border-red-300/20 bg-gray-200/10 backdrop-blur-md !important;
		content: '';
	}

	.glass-container-logo {
		position: relative !important;
	}
</style>

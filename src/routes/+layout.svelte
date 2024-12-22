<script lang="ts">
	import '../app.css';
	import '@fontsource/protest-riot';
	import { PrismicPreview } from '@prismicio/svelte/kit';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { session } from '$lib/firebase/session';
	import { goto } from '$app/navigation';
	import { signOut } from 'firebase/auth';
	import { auth } from '$lib/firebase/firebase.client';
	import type { LayoutData } from './$types';
	import type { PageData } from './$types';
	import Header from '$lib/components/Header.svelte';
	import { repositoryName } from '$lib/prismicio';
	export let data: LayoutData;
	let loading: boolean = true;
	let loggedIn: boolean = false;

	session.subscribe((cur: any) => {
		loading = cur?.loading;
		loggedIn = cur?.loggedIn;
	});

	onMount(async () => {
		const user: any = await data.getAuthUser();
		const loggedIn = !!user;
		console.log(loggedIn);
		session.update((cur: any) => {
			loading = false;
			return {
				...cur,
				user,
				loggedIn,
				loading: false
			};
		});
		if (loggedIn) {
			goto('/');
		}
	});
</script>

<svelte:head>
	<title>{$page.data.title}</title>
	{#if $page.data.meta_description}
		<meta name="description" content={$page.data.meta_description} />
	{/if}
	{#if $page.data.meta_title}
		<meta name="og:title" content={$page.data.meta_title} />
	{/if}
	{#if $page.data.meta_image}
		<meta name="og:image" content={$page.data.meta_image} />
		<meta name="twitter:card" content="summary_large_image" />
	{/if}
</svelte:head>
{#if loading}
	<div>Loading...</div>
{:else}
	<Header settings={$page.data.settings} />
	<main>
		<slot />
	</main>

	<PrismicPreview {repositoryName} />
{/if}

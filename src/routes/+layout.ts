/**@type {import('./$types).LayoutLoad} */
import { initializeFirebase, auth } from '$lib/firebase/firebase.client';
import { browser } from '$app/environment';
import { onAuthStateChanged } from 'firebase/auth';
import { createClient } from '$lib/prismicio';

export async function load({ url, fetch, cookies }) {
	if (browser) {
		try {
			initializeFirebase();
		} catch (ex) {
			console.error(ex);
		}
	}
	function getAuthUser() {
		return new Promise((resolve) => {
			onAuthStateChanged(auth, (user) => resolve(user ? user : false));
		});
	}
	const client = createClient({ fetch, cookies });
	const settings = await client.getSingle('settings');

	return {
		getAuthUser: getAuthUser,
		url: url.pathname,
		settings
	};
}

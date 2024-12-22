<script lang="ts">
	import { session } from '$lib/firebase/session';
	import { auth } from '$lib/firebase/firebase.client';
	import {
		GoogleAuthProvider,
		signInWithPopup,
		signInWithEmailAndPassword,
		type UserCredential
	} from 'firebase/auth';
	import { authUser } from '$lib/firebase/session';
	import { goto } from '$app/navigation';

	let email: string = '';
	let password: string = '';

	async function loginWithMail() {
		await signInWithEmailAndPassword(auth, email, password)
			.then((results) => {
				$authUser = {
					uid: results.user.uid,
					email: results.user.email || ''
				};
				const { user }: UserCredential = results;
				session.set({
					loggedIn: true,
					user: {
						displayName: user?.displayName,
						email: user?.email,
						photoURL: user?.photoURL,
						uid: user?.uid
					}
				});
				goto('/');
			})
			.catch((error) => {
				return error;
			});
	}

	async function loginWithGoogle() {
		const provider = new GoogleAuthProvider();
		await signInWithPopup(auth, provider)
			.then((result) => {
				const { displayName, email, photoURL, uid } = result?.user;
				session.set({
					loggedIn: true,
					user: {
						displayName,
						email,
						photoURL,
						uid
					}
				});
				goto('/');
			})
			.catch((error) => {
				return error;
			});
	}
</script>

<div class="login-form">
	<h1>Login</h1>
	<form on:submit|preventDefault={loginWithMail}>
		<input bind:value={email} type="text" placeholder="Email" class="input" />
		<input bind:value={password} type="password" placeholder="Password" class="input" />
		<button type="submit" class="bttn variant-soft-secondary btn-xl">Login</button>
	</form>

	<div>or</div>
	<button on:click={loginWithGoogle} class="bttn variant-soft-tertiary btn-xl"
		>Login with Google</button
	>
	<div>Don't have an account? <a href="/signup">Sign Up</a></div>
</div>

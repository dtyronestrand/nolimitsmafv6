<script lang="ts">
	import { auth } from '$lib/firebase/firebase.client';
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { goto } from '$app/navigation';
	let email: string;
	let password: string;
	let success: boolean | undefined = undefined;

	const register = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				console.log(userCredentials);
				goto('/login');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);

				success = false;
			});
	};
</script>

<form
	class="space-y-4bg-white flex flex-col gap-4 p-8 sm:w-10/12"
	on:submit|preventDefault={register}
>
	{#if !success && success !== undefined}
		<div class="bg-red-100 text-red-500">There was an error registering. Please try again.</div>
	{/if}
	<input type="email" placeholder="Email" class="input" required bind:value={email} />
	<input type="password" placeholder="Password" class="input" required bind:value={password} />
	<button type="submit" class="default-action variant-ghost-primary btn btn-xl">Register</button>
</form>

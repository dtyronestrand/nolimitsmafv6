import { writable, type Writable } from 'svelte/store';

type User = {
	email?: string | null;
	displayName?: string | null;
	photoURL?: string | null;
	uid?: string | null;
};

export type SessionState = {
	user: User | null;
	loading?: boolean;
	loggedIn?: boolean;
};

export const session = <Writable<SessionState>>writable();
console.log(session);
interface AuthUser {
	uid: string;
	email: string;
}
const authUser = writable<AuthUser | undefined>(undefined);

export { authUser };

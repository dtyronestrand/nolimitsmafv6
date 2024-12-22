// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore, type Firestore } from 'firebase/firestore';
import type { Auth } from 'firebase/auth';
import { browser } from '$app/environment';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, connectAuthEmulator } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//
export let db: Firestore;
export let app: FirebaseApp;
export let auth: Auth;

const firebaseConfig = {
	apiKey: import.meta.env.VITE_APIKEY,
	authDomain: import.meta.env.VITE_AUTHDOMAIN,
	projectId: import.meta.env.VITE_PROJECTID,
	storageBucket: import.meta.env.VITE_STORAGEBUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
	appId: import.meta.env.VITE_APPID,
	measurementId: import.meta.env.VITE_MEASUREMENTID,
	useEmulator: import.meta.env.VITE_FIREBASEUSEEMULATOR === 'true'
};

export const initializeFirebase = () => {
	if (!browser) {
		throw new Error('Cant use the Firebase client on the server.');
	}
	if (!app) {
		app = initializeApp(firebaseConfig);
		auth = getAuth(app);
		db = getFirestore(app);

		if (firebaseConfig.useEmulator) {
			connectAuthEmulator(auth, 'http://localhost:9099');
			connectFirestoreEmulator(db, 'localhost', 8080);
		}
	}
};

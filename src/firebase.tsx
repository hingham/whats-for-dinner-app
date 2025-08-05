import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const googleAuthProvider = new GoogleAuthProvider();

// Not sure if I should be adding scopes here?
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

// has to be prefaced with NEXT_PUBLIC_ to be accessible in the React app
const key = process.env.NEXT_PUBLIC_API_KEY;
console.log('API Key:', key, process.env); // For debugging purposes, remove in production

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: `${process.env.NEXT_PUBLIC_PROJECT_ID}.firebaseapp.com`,
  // The value of `databaseURL` depends on the location of the database
  projectId: process.env.PROJECT_ID,
//   storageBucket: 'PROJECT_ID.firebasestorage.app',
//   messagingSenderId: 'SENDER_ID',
//   appId: 'APP_ID',
//   // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
//   measurementId: 'G-MEASUREMENT_ID',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();
export { auth, googleAuthProvider };

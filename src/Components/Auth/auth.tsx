import React from 'react';
import {
  Container, Button,
} from '@mui/material';
import { signInWithPopup, signOut, User } from 'firebase/auth';

import { auth, googleAuthProvider } from '../../firebase';
import { putUserRole } from '../../Helpers/userRequest';

function Authorization() {
  const [user, setUser] = React.useState<User | null>(auth.currentUser || null);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);

      setUser(result.user);
      const requestToken = await auth.currentUser?.getIdToken(true) || '';
      const idTokenResult = await auth.currentUser?.getIdTokenResult();

      // If no role is set for the user, assign them a default role
      if (!idTokenResult?.claims?.role && result.user) {
        await putUserRole(result.user.uid, 'free-tier', requestToken);
      }

      console.log('User signed in:', result.user, idTokenResult?.claims);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      const signedIn = await auth.currentUser;
      if (signedIn) {
        throw new Error('User is still signed in after sign out');
      }
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {user
        ? (
          <>
            <p>
              Welcome,
              {' '}
              {user.displayName}
            </p>
            <Button type="button" onClick={handleSignOut}>Sign Out</Button>
          </>
        )
        : <Button type="button" onClick={handleSignIn}>Sign In with Google</Button>}
    </Container>
  );
}

export default Authorization;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from 'firebase/auth';
import { auth } from '../firebase';

/**
 * Returns the role of the current signed-in user, or null if not signed in or no role is set.
 */
async function getCurrentUserRole(): Promise<string | null | { [key: string]: any }> {
  const user: User | null = auth.currentUser;
  if (!user) return null;
  try {
    const idTokenResult = await user.getIdTokenResult();
    // The custom claim 'role' is set by the backend or via putUserRole
    return idTokenResult.claims?.role || null;
  } catch (error) {
    console.error('Error fetching user role:', error);
    return null;
  }
}

// eslint-disable-next-line import/prefer-default-export
export { getCurrentUserRole };

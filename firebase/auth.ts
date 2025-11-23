'use client';

import { 
    getAuth,
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut as firebaseSignOut,
    updateProfile as firebaseUpdateProfile,
    EmailAuthProvider,
    reauthenticateWithCredential
} from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeFirebase } from '.';

const { auth, firebaseApp } = initializeFirebase();
const storage = getStorage(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    throw error;
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out', error);
    throw error;
  }
}


export async function reauthenticate(password: string) {
    const user = auth.currentUser;
    if (!user || !user.email) {
        throw new Error("User not found or email not available for re-authentication.");
    }
    const credential = EmailAuthProvider.credential(user.email, password);
    try {
        await reauthenticateWithCredential(user, credential);
    } catch (error) {
        // Let the calling function handle the error UI
        throw error;
    }
}


interface UpdateProfilePayload {
    displayName?: string;
    photoURL?: File | string | null;
}

export async function updateUserProfile(payload: UpdateProfilePayload) {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("User not found. Please sign in again.");
    }

    let photoURL = user.photoURL;

    // Check if a new file is being uploaded
    if (payload.photoURL instanceof File) {
        const file = payload.photoURL;
        const storageRef = ref(storage, `avatars/${user.uid}/${file.name}`);
        await uploadBytes(storageRef, file);
        photoURL = await getDownloadURL(storageRef);
    } else if (typeof payload.photoURL === 'string') {
        // If it's a string, use it directly (though we primarily expect files)
        photoURL = payload.photoURL;
    }

    try {
        await firebaseUpdateProfile(user, {
            displayName: payload.displayName ?? user.displayName,
            photoURL: photoURL,
        });
        // We might need to manually trigger a state update in the UI
        // as onAuthStateChanged might not fire for profile updates.
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
}

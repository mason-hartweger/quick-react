import { useEffect, useState } from 'react';
import { onValue, ref, update} from 'firebase/database';

import { useCallback } from 'react';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { signInWithCredential,connectAuthEmulator, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCs5EdKdLMkVA7eR4sZtTTgSeBTM2Mr6js",
    authDomain: "quick-react-mason-hartweger.firebaseapp.com",
    projectId: "quick-react-mason-hartweger",
    storageBucket: "quick-react-mason-hartweger.appspot.com",
    messagingSenderId: "73050596324",
    appId: "1:73050596324:web:0d1ccac73edf9db9ab5df1",
    measurementId: "G-M34RPW0FYH"
  };

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

const auth = getAuth(firebase);

if (!globalThis.EMULATION && import.meta.env.MODE === 'development') {
    connectAuthEmulator(auth, "http://127.0.0.1:9000");
    connectDatabaseEmulator(database, "127.0.0.1", 9002);
  
  signInWithCredential(auth, GoogleAuthProvider.credential(
    '{"sub": "Uqs7KtLtxdCfuFFzshMO06zDlsl8", "email": "test@gmail.com", "displayName":"test", "email_verified": true}'
  ));
  
  // set flag to avoid connecting twice, e.g., because of an editor hot-reload
  globalThis.EMULATION = true;
}

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
     setData( snapshot.val() );
    }, (error) => {
      setError(error);
    })
  ), [ path ]);
  return [ data, error ];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();
  useEffect(() => (
    onAuthStateChanged(getAuth(firebase), setUser)
  ), []);

  return [user];
};


import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { createMain } from "./login";

export const firebaseConfig = {
    apiKey: "AIzaSyCH2K_CyIvRMF-lWQXAMbFGliumaN3MWcM",
    authDomain: "todoer-a680e.firebaseapp.com",
    projectId: "todoer-a680e",
    storageBucket: "todoer-a680e.appspot.com",
    messagingSenderId: "912608182343",
    appId: "1:912608182343:web:e8432a3c1f901c849ef162",
    databaseURL: "https://todoer-a680e-default-rtdb.firebaseio.com",
  };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);



const provider = new GoogleAuthProvider(app);


export function firebaseAuthen(){
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
        createMain(true);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  
};



 
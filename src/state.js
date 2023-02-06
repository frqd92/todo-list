export let loggedIn = false;

export function isSignedIn(bool){
    loggedIn = bool?true:false;
}
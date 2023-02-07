export let loggedIn = false;
export let isBulb = true;
export function isSignedIn(bool){
    loggedIn = bool?true:false;
}
export function turnBulb(bool){
    isBulb = bool?true:false;
}
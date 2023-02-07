export let loggedIn = false;
export let savedTheme = "light-theme";

export function isSignedIn(bool){
    loggedIn = bool?true:false;
}

export function themeFunc(theme){
    savedTheme = theme;
}